// src/App.js (or src/App.jsx)
import React, { useContext, useEffect, Fragment } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

// Import Auth Context
import AuthContext from './context/auth/authContext';

// Import page components
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Information from './pages/Information';
// These pages will be protected
import TaskUpload from './pages/TaskUpload';
import AdminDashboard from './pages/AdminDashboard';
import DataVisualization from './pages/DataVisualization';

// Import the ProtectedRoute component
import ProtectedRoute from './components/routing/ProtectedRoute';


function App() {
  // Destructure state and functions from auth context
  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated, logout, user, loading, error, clearErrors } = authContext; // Include clearErrors

  const navigate = useNavigate(); // Initialize navigate hook

  console.log('App Render:', { isAuthenticated, loading, user, error }); 
  // eslint-disable-next-line react-hooks/exhaustive-deps 
 useEffect(() => {
  console.log('App useEffect: Running loadUser check.');

  // The logic inside AuthState's loadUser handles checking localStorage for token
  // We just need to call loadUser here.
  loadUser();

  // Dependency array is empty, effect runs only once on mount
  // eslint-disable-next-line
}, []); 

  // Effect to handle redirection after auth state changes (optional, can also be handled in components)
  // useEffect(() => {
  //    if (isAuthenticated && !loading && user) {
  //        // Optional: redirect authenticated users away from login/register if they try to access them
  //        // Example: If on /login or /register and become authenticated, redirect to home
  //        if (window.location.pathname === '/login' || window.location.pathname === '/register') {
  //             navigate('/');
  //        }
  //    }
  // }, [isAuthenticated, loading, user, navigate]);


  // Handle Logout click
  const onLogout = () => {
    logout(); // Call the logout function from context
    navigate('/login'); // Redirect to login page after logout
    // Optional: clear errors after logout if any were showing
    clearErrors();
  };


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
            {/* Use a button or styled link for better click handling */}
            <button onClick={onLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'underline' }}>
              Logout
            </button>
          </li>
        </Fragment>
      );
      // ------------------------------------------------------------


      return (
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/information">Information</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {/* Conditionally render links based on authentication status and loading state */}
          {/* Render links ONLY when not loading */}
          {!loading && (isAuthenticated ? authLinks : guestLinks)}
           {/* Optional: Render login/register if NOT authenticated AND NOT loading */}
           {/* If you want to show login/register when not authenticated AND not loading */}
           {/* {!isAuthenticated && !loading && ( */}
           {/* <Fragment> */}
           {/* <li><Link to="/register">Register</Link></li> */}
           {/* <li><Link to="/login">Login</Link></li> */}
           {/* </Fragment> */}
           {/* )} */}

           {/* If you want to show auth links when authenticated AND not loading */}
           {/* {isAuthenticated && !loading && ( */}
           {/* ... authLinks content ... */}
           {/* )} */}
           {/* The single line {!loading && (isAuthenticated ? authLinks : guestLinks)} is concise */}
           {/* but ensures links only appear when loading is false */}

        </ul>
      );
  };


  return (
    <div className="App">
       <nav>
         {/* Render navigation links */}
         {renderNavLinks()}
       </nav>

       {/* Add a visual indicator when loading */}
       {loading && <div style={{ textAlign: 'center', padding: '10px' }}>Loading application data...</div>}


      <Routes>
         {/* Public Routes */}
         <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/information" element={<Information />} />

        {/* Use ProtectedRoute for routes that require authentication */}
        {/* Pass the component itself to the 'element' prop */}
        <Route
          path="/upload-task"
          element={<ProtectedRoute element={TaskUpload} />}
        />
         <Route
          path="/admin"
          element={<ProtectedRoute element={AdminDashboard} role="admin" />} // Requires 'admin' role
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