// Navbar.jsx — Top navigation bar using Bootstrap + MUI

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ChecklistIcon from '@mui/icons-material/Checklist';

function Navbar() {
  return (
    <AppBar position="static" style={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        {/* App icon */}
        <ChecklistIcon style={{ marginRight: '10px' }} />

        {/* App title */}
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;