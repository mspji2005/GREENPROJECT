// src/App.js (or src/App.jsx)
import React, { useContext, useEffect, Fragment } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

// Import Auth Context
import AuthContext from './context/auth/authContext';

// Import placeholder components
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Information from './pages/Information';
import TaskUpload from './pages/TaskUpload';
import AdminDashboard from './pages/AdminDashboard';
import DataVisualization from './pages/DataVisualization';

// Import the ProtectedRoute component
import ProtectedRoute from './components/routing/ProtectedRoute';


function App() {
  // Destructure state and functions from auth context
  // >>> Make sure 'error' and 'loading' are included here <<<
  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated, logout, user, loading, error } = authContext;

  const navigate = useNavigate(); // Initialize navigate hook

  // Load user on component mount
  useEffect(() => {
    // Set auth token in header on every request if token exists
    const token = localStorage.getItem('token');
    if (token) {
       // setAuthToken(token); // This is handled in AuthState's loadUser
       loadUser(); // Call loadUser to validate the token and fetch user data
    } else {
        // If no token, ensure loading is false and isAuthenticated is false
        // The AUTH_ERROR dispatch in loadUser handles this if the /api/auth/user call fails.
        // If loadUser was never called (no token existed), the initial state should already be false/null,
        // but loadUser is still called to ensure consistent state update logic.
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this runs once on mount

  // Handle Logout click
  const onLogout = () => {
    logout(); // Call the logout function from context
    navigate('/login'); // Redirect to login page after logout
  };

  // --- Add this console.log here ---
  console.log('Auth State:', { isAuthenticated, loading, user, error });
  // ---------------------------------


  // Function to render navigation links conditionally
  const renderNavLinks = () => {
      // --- Define authLinks and guestLinks INSIDE this function ---
      const guestLinks = (
         <Fragment>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
         </Fragment>
      );

      const authLinks = (
        <Fragment>
          {/* Display user's name if available and not loading */}
          {!loading && user && <li>Hello {user.name}!</li>}
          <li><Link to="/upload-task">Upload Task</Link></li>
          {/* Conditionally show admin link if user is admin */}
          {!loading && user && user.role === 'admin' && (
               <li><Link to="/admin">Admin Dashboard</Link></li>
          )}
           <li><Link to="/data">Data Visualization</Link></li>
          <li>
            {/* Add onClick handler to the Link or a Button */}
            <a onClick={onLogout} href="#!">
              Logout
            </a>
          </li>
        </Fragment>
      );
      // ------------------------------------------------------------


      return (
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/information">Information</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {/* Conditionally render links based on authentication status */}
          {!loading && (isAuthenticated ? authLinks : guestLinks)}
        </ul>
      );
  };


  return (
    <div className="App">
       <nav>
         {/* Call the function to render the links */}
         {renderNavLinks()}
       </nav>

      <Routes>
         {/* Public Routes */}
         <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/information" element={<Information />} />

        {/* Use ProtectedRoute for routes that require authentication */}
        <Route
          path="/upload-task"
          element={<ProtectedRoute element={TaskUpload} />}
        />
         <Route
          path="/admin"
          element={<ProtectedRoute element={AdminDashboard} role="admin" />}
        />
         <Route
          path="/data"
          element={<ProtectedRoute element={DataVisualization} />}
        />

        {/* Catch-all for 404 */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;