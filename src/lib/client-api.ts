// Client-side API configuration - uses direct Railway API
export const CLIENT_API_CONFIG = {
  BASE_URL: 'https://nrgug-api-production.up.railway.app/api', // Direct API call
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

// Helper function to get the full API URL for client-side requests
export function getClientApiUrl(endpoint: string): string {
  const baseUrl = CLIENT_API_CONFIG.BASE_URL.replace(/\/$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
}

// Client-side fetch wrapper
export async function clientFetch(endpoint: string, options: RequestInit = {}) {
  const url = getClientApiUrl(endpoint);
  
  // Add aggressive cache-busting parameter to force fresh data
  const cacheBuster = `?t=${Date.now()}&v=${Math.random().toString(36).substr(2, 9)}`;
  const finalUrl = url + cacheBuster;
  
  const response = await fetch(finalUrl, {
    ...options,
    headers: {
      ...CLIENT_API_CONFIG.HEADERS,
      ...options.headers,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response;
}
