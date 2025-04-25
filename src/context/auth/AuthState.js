// src/context/auth/AuthState.js
import React, { useReducer } from 'react';
import axios from 'axios';
import authContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken'; // Utility to set token in headers

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'), // Get token from local storage
    isAuthenticated: null, // Initial authentication status
    loading: true, // <<< Initially true while we check for token/user
    user: null, // Logged-in user object
    error: null // Any authentication errors
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User - Checks token and fetches user data
  const loadUser = async () => {
    console.log('--- loadUser called ---'); // <<< Add console log
    console.log('Initial state in loadUser:', { token: state.token, isAuthenticated: state.isAuthenticated, loading: state.loading, user: state.user, error: state.error }); // <<< Add console log


    // Set token in Axios headers if it exists in local storage
    if (localStorage.token) {
      console.log('Token found in localStorage. Setting Axios header.'); // <<< Add console log
      setAuthToken(localStorage.token);
    } else {
        // If no token, make sure it's not set in headers
        setAuthToken(null);
         console.log('No token found in localStorage. Clearing Axios header.'); // <<< Add console log
    }


    try {
      console.log('Attempting GET request to /api/auth/user'); // <<< Add console log
      // Make a GET request to the backend to get user data based on the token
      const res = await axios.get('/api/auth/user');
      console.log('GET /api/auth/user successful. Response data:', res.data); // <<< Add console log


      dispatch({
        type: USER_LOADED, // This action type will set loading: false
        payload: res.data // The user data { id, name, email, role, tokens, ... }
      });
      console.log('USER_LOADED dispatched.'); // <<< Add console log


    } catch (err) {
      console.error('Error in loadUser (GET /api/auth/user):', err.message); // Log the error message
       // Log backend response error if available
       if(err.response && err.response.data) {
           console.error('Backend error response data:', err.response.data); // <<< Add console log
       } else {
            console.error('No backend response data found.'); // <<< Add console log
       }

      dispatch({ type: AUTH_ERROR }); // This action type will set loading: false
      console.log('AUTH_ERROR dispatched.'); // <<< Add console log

    } finally {
        // Ensure loading is set to false even if something unexpected happens
        // This might not be necessary if AUTH_ERROR and USER_LOADED always dispatch
        // but can be a safeguard. However, dispatch should ideally handle state changes.
        // console.log('loadUser finally block reached.');
    }
     console.log('--- loadUser finished ---'); // <<< Add console log
     console.log('State after loadUser attempt:', { token: localStorage.getItem('token'), isAuthenticated: state.isAuthenticated, loading: state.loading, user: state.user, error: state.error }); // <<< Add console log
  };

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      console.log('Attempting POST request to /api/auth/register with data:', formData); // <<< Add console log
      const res = await axios.post('/api/auth/register', formData, config);
      console.log('POST /api/auth/register successful. Response data:', res.data); // <<< Add console log


      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data // Should contain the token: { token: '...' }
      });
      console.log('REGISTER_SUCCESS dispatched.'); // <<< Add console log


      // Load the user after successful registration to get user details and set isAuthenticated
      loadUser();

    } catch (err) {
      console.error('Error in register (POST /api/auth/register):', err.message); // Log the error message
       if(err.response && err.response.data && err.response.data.msg) {
           console.error('Backend error message:', err.response.data.msg); // <<< Add console log
           dispatch({
             type: REGISTER_FAIL,
             payload: err.response.data.msg // The error message from backend
           });
            console.log('REGISTER_FAIL dispatched.'); // <<< Add console log

       } else {
            console.error('Unknown registration error.'); // <<< Add console log
             dispatch({
             type: REGISTER_FAIL,
             payload: 'Registration failed. Please try again.' // Generic error
           });
            console.log('REGISTER_FAIL dispatched with generic message.'); // <<< Add console log
       }

    }
  };

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      console.log('Attempting POST request to /api/auth/login with data:', formData); // <<< Add console log
      const res = await axios.post('/api/auth/login', formData, config);
      console.log('POST /api/auth/login successful. Response data:', res.data); // <<< Add console log


      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data // Should contain the token: { token: '...' }
      });
      console.log('LOGIN_SUCCESS dispatched.'); // <<< Add console log


      // Load the user after successful login to get user details and set isAuthenticated
      loadUser();

    } catch (err) {
      console.error('Error in login (POST /api/auth/login):', err.message); // Log the error message
       if(err.response && err.response.data && err.response.data.msg) {
           console.error('Backend error message:', err.response.data.msg); // <<< Add console log
           dispatch({
             type: LOGIN_FAIL,
             payload: err.response.data.msg // The error message from backend
           });
           console.log('LOGIN_FAIL dispatched.'); // <<< Add console log

       } else {
            console.error('Unknown login error.'); // <<< Add console log
             dispatch({
             type: LOGIN_FAIL,
             payload: 'Login failed. Please check credentials.' // Generic error
           });
            console.log('LOGIN_FAIL dispatched with generic message.'); // <<< Add console log
       }
    }
  };


  // Logout
  const logout = () => {
      console.log('Logout called.'); // <<< Add console log
      dispatch({ type: LOGOUT }); // This action type will set loading: false
      console.log('LOGOUT dispatched.'); // <<< Add console log
  }


  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });


  return (
    // Provide state and functions to components via context
    <authContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser, // Provide loadUser function
        login,
        logout,
        clearErrors
      }}
    >
      {props.children} {/* Render children components */}
    </authContext.Provider>
  );
};

export default AuthState;