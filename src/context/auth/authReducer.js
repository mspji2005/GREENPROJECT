// src/context/auth/authReducer.js
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
  } from '../types'; // We'll create this next
  
  const authReducer = (state, action) => {
    switch (action.type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload // The user object
        };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token); // Store token in local storage
        return {
          ...state,
          ...action.payload, // Should contain the token
          isAuthenticated: true,
          loading: false,
          error: null // Clear any previous errors
        };
      case REGISTER_FAIL:
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
        localStorage.removeItem('token'); // Remove token from local storage
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null, // Clear user data
          error: action.payload // Set error message
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null // Clear error message
        };
      default:
        return state;
    }
  };
  
  export default authReducer;