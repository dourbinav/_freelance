import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, Alert, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const navigate = useNavigate();

  // Disable scrolling when the AdminLogin component is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Clean up by resetting body overflow when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleLogin = () => {
    // Hardcoded credentials (for demonstration purposes)
    const correctEmail = 'admin@example.com';
    const correctPassword = 'admin123';

    if (email === correctEmail && password === correctPassword) {
      localStorage.setItem('admin-auth', correctEmail);
      navigate('/admin');
    } else {
      setSnackbarMessage('Invalid email or password');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',  // Align to top
        height: '100vh',
        backgroundColor: '#f4f6f8',
        overflow: 'hidden', // Disable scroll
        paddingTop: '50px', // Add some top padding (you can adjust this value)
      }}
    >
      <Paper sx={{ padding: 4, width: '100%', maxWidth: 400, boxShadow: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Admin Login
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
        />
        
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
