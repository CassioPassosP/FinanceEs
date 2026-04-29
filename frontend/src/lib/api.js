// finance-project/frontend/src/lib/api.js
export async function authFetch(path, options = {}) {
  const API = import.meta.env.VITE_API_URL;
  const url = `${API}${path.startsWith('/') ? path : '/' + path}`;
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`; 

  const res = await fetch(url, { ...options, headers });
  const text = await res.text();
  try { return { ok: res.ok, status: res.status, data: JSON.parse(text) }; }
  catch { return { ok: res.ok, status: res.status, data: text }; }
}
