const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./student');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/studentDB';

app.use(cors());
app.use(express.json());

// 1. Get all students
app.get('/api/students', async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    next(err);
  }
});

// 2. Get student by id
app.get('/api/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// 3. Create student
app.post('/api/students', async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (!payload.rollNo && payload.rollno) {
      payload.rollNo = payload.rollno;
    }
    const student = await Student.create(payload);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
});

// 4. Update student
app.put('/api/students/:id', async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (!payload.rollNo && payload.rollno) {
      payload.rollNo = payload.rollno;
    }
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true, runValidators: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (err) {
    next(err);
  }
});

// 5. Delete student
app.delete('/api/students/:id', async (req, res, next) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully', id: req.params.id });
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError' || err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: err.message });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });