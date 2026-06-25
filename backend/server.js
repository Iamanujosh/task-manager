// ============================================================
// server.js — Task Manager REST API
// Built with: Node.js + Express
// Storage: tasks.json (file-based, no database needed)
// Author: Anushka Joshi
// Last updated: June 2026
// ============================================================

const express = require('express');   // Web framework
const cors = require('cors');         // Allows frontend to call this API
const { v4: uuidv4 } = require('uuid'); // Generates unique IDs
const fs = require('fs');             // Built-in Node file system module
const path = require('path');         // Built-in Node path helper

const app = express();
const PORT = process.env.PORT || 5000; // Use env variable in production, 5000 locally

// ── Path to our JSON "database" ──────────────────────────────
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// ============================================================
// MIDDLEWARE
// Middleware runs on every request before it hits your routes
// ============================================================
app.use(cors());            // Allow all origins (fine for development)
app.use(express.json());    // Parse incoming JSON request bodies


// ============================================================
// HELPER FUNCTIONS
// Reusable functions to read/write tasks.json
// ============================================================

// Read tasks from tasks.json — returns an array of tasks
function loadTasks() {
  try {
    const data = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // If file doesn't exist or is corrupted, start fresh
    return [];
  }
}

// Write tasks array back to tasks.json
function saveTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
  // null, 2 = pretty print with 2-space indentation (readable in file)
}


// ============================================================
// ROUTES — CRUD Operations
// ============================================================

// ── Health Check ─────────────────────────────────────────────
// GET / — just to confirm the server is running
app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running ✅' });
});


// ── READ ─────────────────────────────────────────────────────
// GET /tasks — return all tasks
app.get('/tasks', (req, res) => {
  const tasks = loadTasks();
  res.json({
    success: true,
    count: tasks.length,  // Handy for the frontend to know total
    data: tasks
  });
});


// ── CREATE ───────────────────────────────────────────────────
// POST /tasks — add a new task
// Expects body: { title, description, priority }
app.post('/tasks', (req, res) => {
  const { title, description, priority } = req.body;

  // Validation — title is required
  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Title is required.'
    });
  }

  // Build the new task object
  const newTask = {
    id: uuidv4(),                         // Unique ID
    title: title.trim(),
    description: description?.trim() || '', // Optional field
    priority: priority || 'medium',        // Default priority
    completed: false,                      // Always starts incomplete
    createdAt: new Date().toISOString()    // ISO timestamp
  };

  const tasks = loadTasks();
  tasks.unshift(newTask);   // Add to beginning so newest appears first
  saveTasks(tasks);

  // 201 = "Created" (more specific than 200)
  res.status(201).json({
    success: true,
    message: 'Task created successfully.',
    data: newTask
  });
});


// ── UPDATE ───────────────────────────────────────────────────
// PUT /tasks/:id — edit an existing task
// :id is a URL parameter, e.g. PUT /tasks/abc-123
app.put('/tasks/:id', (req, res) => {
  const tasks = loadTasks();

  // Find the index of the task with matching ID
  const index = tasks.findIndex(task => task.id === req.params.id);

  // If not found, return 404
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Task not found.'
    });
  }

  // Merge existing task with new values (only update what was sent)
  const updatedTask = {
    ...tasks[index],                // Keep existing fields
    ...req.body,                    // Overwrite with new values
    id: tasks[index].id,            // Never allow ID to be changed
    createdAt: tasks[index].createdAt, // Never change original timestamp
    updatedAt: new Date().toISOString() // Track when it was last edited
  };

  tasks[index] = updatedTask;
  saveTasks(tasks);

  res.json({
    success: true,
    message: 'Task updated successfully.',
    data: updatedTask
  });
});


// ── DELETE ───────────────────────────────────────────────────
// DELETE /tasks/:id — remove a task
app.delete('/tasks/:id', (req, res) => {
  const tasks = loadTasks();
  const index = tasks.findIndex(task => task.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Task not found.'
    });
  }

  // Remove the task from the array
  const [deletedTask] = tasks.splice(index, 1);
  saveTasks(tasks);

  res.json({
    success: true,
    message: 'Task deleted successfully.',
    data: deletedTask   // Return deleted task so frontend can confirm
  });
});


// ============================================================
// 404 HANDLER
// Catches any route that doesn't match above
// ============================================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} does not exist.`
  });
});


// ============================================================
// START SERVER
// ============================================================
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Tasks stored in: ${TASKS_FILE}`);
});