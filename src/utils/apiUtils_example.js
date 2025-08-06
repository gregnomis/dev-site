/**
 * Bonus utility functions for making server-side local API requests with Auth - not used in my site. See root README.md for details.
 */

// Helper function to get API URL based on environment
const getApiUrl = (endpoint) => {
  // In production, API requests go to the same domain (handled by nginx proxy)
  // In development, they go to the local dev server
  const baseUrl = import.meta.env.PROD ? '/api' : 'http://localhost:5001/api';
  return `${baseUrl}${endpoint}`;
};

/**
 * Makes an authorized fetch request to the API
 * @param {string} endpoint - API endpoint (e.g., '/analyze')
 * @param {Object} options - Fetch options
 * @returns {Promise} - Fetch promise
 */
export const fetchWithAuth = async (endpoint, options = {}) => {
  // Get API key from environment variable in Vite
  // Note: Must be prefixed with VITE_ to be exposed to the client
  const apiKey = import.meta.env.VITE_API_KEY;
  
  // Set up headers with authorization
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
  };
  
  // Only add Authorization header if API key is available
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }
  
  const url = getApiUrl(endpoint);
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * Fetch repository analysis data
 * @param {string} project - Project name to analyze
 * @returns {Promise<Object>} - Analysis data
 */
export const fetchRepoAnalysis = (project = 'LockChain') => {
  return fetchWithAuth(`/analyze?project=${encodeURIComponent(project)}`);
};

export default {
  fetchWithAuth,
  fetchRepoAnalysis,
};
