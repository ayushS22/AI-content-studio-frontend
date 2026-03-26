import axios from "axios";// Import Axios library to make HTTP requests
// Create a custom Axios instance
const api = axios.create({
  // Base URL for all API requests
  // This value comes from environment variables (Vite)
  // Example: https://api.example.com
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add a request interceptor
// This runs BEFORE every API request is sent
api.interceptors.request.use(
  (config) => {
    //add tokens in the header
    const token = localStorage.getItem("token");  // Get JWT token from browser localStorage
     // If token exists, attach it to request headers
    if (token) {
      // Authorization header format:
      // Bearer <token>
      config.headers.Authorization = `Bearer ${token}`;
    }
     // Return the modified config so request can continue
    return config;
  },
  // If request setup fails, reject the promise
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

// I created a custom Axios instance with a base URL and added a request interceptor to automatically attach JWT tokens from
//  localStorage to every API call. This avoids repeating authorization logic and centralizes authentication handling.

// This code creates an Axios instance and uses interceptor to add JWT token automatically in headers before every request.




// # What is Authorization?

// Authorization is an HTTP header used to send credentials (proof of identity) to the server.

// # It tells the server:

// “Hey, I am this user — here’s my proof.”

// Example header:

// Authorization: Bearer abc123xyz
// # What is Bearer?

// Bearer is a type of authentication scheme.

// It means:

// “Whoever bears (holds) this token is allowed to access the resource.”

// So:

// No username/password sent every time
// Just send a token
// Server trusts the token
