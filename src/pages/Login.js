// src/pages/Login.js
import React, { useState, useContext, useEffect } from 'react'; // Import useState, useContext, useEffect
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

// Import MUI Components
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert'; // For displaying potential errors

// Import Auth Context
import AuthContext from '../context/auth/authContext';

function Login() {
  // Access auth context
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  const navigate = useNavigate(); // Initialize navigate hook

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to home page or dashboard after successful login
    }

    // Clear errors when the component unmounts or isAuthenticated changes
     if (error) {
        // clearErrors(); // uncomment if you want to clear errors on subsequent visits
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate, error]); // Dependencies for useEffect

  // Component state for form fields
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  // Handle input changes
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent default browser form submission

    // Basic validation
    if (email === '' || password === '') {
        console.error('Please enter all fields'); // For now, simple console log
        // You could set local validation state here
    } else {
      console.log('Logging in user...');
      // Call the login function from auth context
      login({
        email,
        password
      });
       // clearErrors(); // Clear errors before attempting login
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '40px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Account Login
      </Typography>

       {/* Display errors from context */}
      {error && typeof error === 'string' && ( // Check if error exists and is a string
           <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}

      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={onChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={onChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default Login;