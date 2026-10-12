# Student Management System

A simple, basic React Student Management System with Node.js/Express and MongoDB backend.

## Features
- View all students in a plain HTML table
- Add new student with Name, Roll Number, and Marks
- Edit existing student information
- Delete student with confirmation
- Clean, semantic, no-UI design

## Project Structure
```
student_mgmt/
├── backend/
│   ├── server.js       # Express REST API (CRUD)
│   ├── student.js      # Mongoose Student model
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx     # Simple React Student Management UI
    │   └── main.jsx
    └── package.json
```

## Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) running locally on default port `27017`

### 2. Run Backend
```bash
cd backend
npm install
npm start
```
The server will start on `http://localhost:5000`.

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.
