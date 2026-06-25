// TaskForm.jsx — Form for adding and editing tasks
// Used inside a MUI Dialog (modal)

import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// task = null means we are adding, task = object means we are editing
function TaskForm({ open, onClose, onSubmit, task }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');

  // If editing, pre-fill form with existing task values
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    } else {
      // Reset form when opening for a new task
      setTitle('');
      setDescription('');
      setPriority('medium');
      setError('');
    }
  }, [task, open]);

  const handleSubmit = () => {
    // Frontend validation
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    // Pass form data up to App.jsx
    onSubmit({ title, description, priority });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>

      <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '16px' }}>
        {/* Title field */}
        <TextField
          label="Title *"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError(''); }}
          error={Boolean(error)}
          helperText={error}
          fullWidth
        />

        {/* Description field */}
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
        />

        {/* Priority dropdown */}
        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            label="Priority"
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions style={{ padding: '16px' }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {task ? 'Update Task' : 'Add Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskForm;