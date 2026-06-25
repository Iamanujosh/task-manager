// App.jsx — Root component, manages all state and API calls

import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // null = add mode
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch tasks from backend on first load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      showSnackbar('Failed to load tasks.', 'error');
    }
  };

  // Open modal for adding
  const handleAddClick = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  // Open modal for editing
  const handleEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  // Add or update task
  const handleSubmit = async (formData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, formData);
        showSnackbar('Task updated successfully!', 'success');
      } else {
        await createTask(formData);
        showSnackbar('Task created successfully!', 'success');
      }
      fetchTasks(); // Refresh list
    } catch (err) {
      showSnackbar('Something went wrong.', 'error');
    }
  };

  // Toggle completed status
  const handleToggle = async (task) => {
    try {
      await updateTask(task.id, { completed: !task.completed });
      fetchTasks();
    } catch (err) {
      showSnackbar('Failed to update task.', 'error');
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      showSnackbar('Task deleted.', 'success');
      fetchTasks();
    } catch (err) {
      showSnackbar('Failed to delete task.', 'error');
    }
  };

  // Show snackbar notification
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div>
      <Navbar />

      <Container maxWidth="lg" style={{ marginTop: '32px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">
            Tasks — {completedCount}/{tasks.length} completed
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
          >
            Add Task
          </Button>
        </div>

        {/* Task table */}
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Container>

      {/* Add/Edit modal */}
      <TaskForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        task={editingTask}
      />

      {/* Success/error notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;