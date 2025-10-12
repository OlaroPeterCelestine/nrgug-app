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
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...CLIENT_API_CONFIG.HEADERS,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response;
}
