// TaskList.jsx — Displays all tasks in a MUI Table
// Handles complete toggle, edit button, delete button

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

function TaskList({ tasks, onToggle, onEdit, onDelete }) {

  // Show message if no tasks exist
  if (tasks.length === 0) {
    return (
      <Typography
        variant="body1"
        style={{ textAlign: 'center', marginTop: '40px', color: '#9e9e9e' }}
      >
        No tasks yet. Click "Add Task" to get started!
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} style={{ marginTop: '24px' }}>
      <Table>
        <TableHead style={{ backgroundColor: '#1976d2' }}>
          <TableRow>
            <TableCell style={{ color: 'white' }}>Done</TableCell>
            <TableCell style={{ color: 'white' }}>Title</TableCell>
            <TableCell style={{ color: 'white' }}>Description</TableCell>
            <TableCell style={{ color: 'white' }}>Priority</TableCell>
            <TableCell style={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              className={task.completed ? 'row-completed' : ''}
            >
              {/* Checkbox to toggle completed */}
              <TableCell>
                <Checkbox
                  checked={task.completed}
                  onChange={() => onToggle(task)}
                  color="primary"
                />
              </TableCell>

              {/* Title — strikethrough if completed */}
              <TableCell>
                <span className={task.completed ? 'task-completed' : ''}>
                  {task.title}
                </span>
              </TableCell>

              {/* Description */}
              <TableCell>
                <span className={task.completed ? 'task-completed' : ''}>
                  {task.description || '—'}
                </span>
              </TableCell>

              {/* Priority badge */}
              <TableCell>
                <Chip
                  label={task.priority}
                  size="small"
                  className={`priority-${task.priority}`}
                />
              </TableCell>

              {/* Edit and Delete buttons */}
              <TableCell>
                <IconButton onClick={() => onEdit(task)} color="primary" size="small">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(task.id)} color="error" size="small">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskList;