import { useState, useEffect } from "react";

const API = "http://localhost:5000/api/students";

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    marks: ""
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Fetch students
  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(API);
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
      setError("Could not connect to backend server. Make sure backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // 2. Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 3. Add or update student
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editId ? `${API}/${editId}` : API;
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          rollNo: form.rollNo,
          marks: Number(form.marks)
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        alert(errData.error || "Operation failed");
        return;
      }

      setForm({ name: "", rollNo: "", marks: "" });
      setEditId(null);
      loadStudents();
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  // 4. Edit student
  const handleEdit = (s) => {
    setForm({
      name: s.name,
      rollNo: s.rollNo || s.rollno || "",
      marks: s.marks
    });
    setEditId(s._id);
  };

  // 5. Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      loadStudents();
    } catch (err) {
      alert("Error deleting student: " + err.message);
    }
  };

  return (
    <div style={{ padding: 25, fontFamily: "sans-serif" }}>
      <h1>Student Management System</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        {" "}
        <input
          name="rollNo"
          placeholder="Roll Number"
          value={form.rollNo}
          onChange={handleChange}
          required
        />
        {" "}
        <input
          name="marks"
          type="number"
          placeholder="Marks"
          min="0"
          max="100"
          value={form.marks}
          onChange={handleChange}
          required
        />
        {" "}
        <button type="submit">
          {editId ? "Update Student" : "Add Student"}
        </button>
        {" "}
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ name: "", rollNo: "", marks: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Student List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.rollNo || s.rollno}</td>
                <td>{s.marks}</td>
                <td>
                  <button onClick={() => handleEdit(s)}>
                    Edit
                  </button>
                  {" "}
                  <button onClick={() => handleDelete(s._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
