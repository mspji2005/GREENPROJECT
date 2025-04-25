// src/pages/Register.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import MUI Components
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

// Import Auth Context
import AuthContext from '../context/auth/authContext';

function Register() {
  // Access auth context
  // Make sure clearErrors is destructured here
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  const navigate = useNavigate();

  // Add a useEffect to clear errors when the component mounts
  useEffect(() => {
    // Clear any previous errors when the page loads
    clearErrors();
     console.log('Register page: clearErrors called on mount.'); // Add log


    // The effect for redirection if authenticated
    if (isAuthenticated) {
      navigate('/'); // Redirect to home page or dashboard
    }

    // The dependency array includes things useEffect depends on
    // Adding clearErrors here is technically correct as per the rule
    // But since it's a function from context unlikely to change,
    // and we only want to run on mount, we could technically omit it
    // IF clearErrors itself was guaranteed stable.
    // The simplest way to satisfy the linter is [clearErrors, isAuthenticated, navigate]
    // However, to ensure it only runs ON MOUNT for clearing errors,
    // a separate useEffect is cleaner, OR include clearErrors and isAuthenticated/navigate
    // Let's use one useEffect and include all dependencies as the linter expects.

  }, [clearErrors, isAuthenticated, navigate]); // Include clearErrors, isAuthenticated, and navigate


  // Component state for form fields
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  // Handle input changes
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();

    // Clear errors before attempting a new registration
    clearErrors(); // <<< Use clearErrors here before submitting

    if (name === '' || email === '' || password === '' || password2 === '') {
      console.error('Please enter all fields');
       // You could potentially dispatch an error to context here if you want
       // authContext.dispatch({ type: REGISTER_FAIL, payload: 'Please enter all fields' });
    } else if (password !== password2) {
      console.error('Passwords do not match');
       // authContext.dispatch({ type: REGISTER_FAIL, payload: 'Passwords do not match' });
    } else {
      console.log('Registering user...', user);
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '40px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Account Register
      </Typography>

      {/* Display errors from context */}
      {error && typeof error === 'string' && (
           <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}


      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={onChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
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
          autoComplete="new-password"
          value={password}
          onChange={onChange}
          minLength="6"
        />
         <TextField
          margin="normal"
          required
          fullWidth
          name="password2"
          label="Confirm Password"
          type="password"
          id="password2"
          autoComplete="new-password"
          value={password2}
          onChange={onChange}
          minLength="6"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default Register;