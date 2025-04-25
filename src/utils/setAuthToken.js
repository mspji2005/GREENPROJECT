// src/utils/setAuthToken.js
import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token; // Set token in header
  } else {
    delete axios.defaults.headers.common['x-auth-token']; // Remove token from header
  }
};

export default setAuthToken;