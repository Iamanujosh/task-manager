// taskService.js — All API calls to the backend live here
// Using axios to make HTTP requests
// Base URL is proxied to http://localhost:5000 via vite.config.js

import axios from 'axios';

const BASE_URL = '/tasks';

// GET /tasks — fetch all tasks
export const getTasks = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// POST /tasks — create a new task
export const createTask = async (taskData) => {
  const response = await axios.post(BASE_URL, taskData);
  return response.data;
};

// PUT /tasks/:id — update an existing task
export const updateTask = async (id, taskData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, taskData);
  return response.data;
};

// DELETE /tasks/:id — delete a task
export const deleteTask = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};