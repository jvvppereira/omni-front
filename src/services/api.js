const baseURL = process.env.REACT_APP_API_URL || 'https://omni-back-jvvppereira.vercel.app/';

async function request(method, endpoint, data) {
  const url = `${baseURL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  console.log(`[API] ${method} ${url}`, data ? data : '');
  const response = await fetch(url, options);
  console.log(`[API] ${method} ${url} - Status: ${response.status}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  const result = await response.json();
  console.log(`[API] ${method} ${url} - Response:`, result);
  return result;
}

const api = {
  get: (endpoint) => request('GET', endpoint),
  post: (endpoint, data) => request('POST', endpoint, data),
  put: (endpoint, data) => request('PUT', endpoint, data),
  delete: (endpoint) => request('DELETE', endpoint),
};

api.defaults = { baseURL };

export default api;
