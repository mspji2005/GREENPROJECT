// src/index.js (or src/main.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Keep your global CSS if any
import { BrowserRouter } from 'react-router-dom';
import AuthState from './context/auth/AuthState'; // Import AuthState

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    {/* BrowserRouter for routing */}
    <BrowserRouter>
      {/* AuthState provider to manage authentication state */}
      <AuthState>
        {/* The main App component */}
        <App />
      </AuthState>
    </BrowserRouter>
  </React.StrictMode>
);