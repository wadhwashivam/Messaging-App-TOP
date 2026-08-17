import { getToken } from "./auth.js";

async function apiRequest(endpoint, options = {}) {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const url = `${baseUrl}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  };

  const headers = { ...defaultHeaders, ...options.headers };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message || errorData.errors?.[0]?.msg || 'API request failed';
    throw new Error(message);
  }
  if (response.status === 204) {
    return null; // No content to return
  }
  return response.json();
}

export default apiRequest;  

