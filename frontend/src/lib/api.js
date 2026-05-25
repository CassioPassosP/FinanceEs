// finance-project/frontend/src/lib/api.js
export async function authFetch(path, options = {}) {

  const API = import.meta.env.VITE_API_URL;

  const url = `${API}${path.startsWith('/') ? path : '/' + path}`;

  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {

    const res = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal
    });

    clearTimeout(timeout);

    const text = await res.text();

    try {
      return {
        ok: res.ok,
        status: res.status,
        data: JSON.parse(text)
      };

    } catch {

      return {
        ok: res.ok,
        status: res.status,
        data: text
      };
    }

  } catch (error) {

    clearTimeout(timeout);

    console.error('Erro na requisição:', error);

    throw new Error(
      error.name === 'AbortError'
        ? 'Servidor demorou para responder'
        : 'Erro de conexão com o servidor'
    );
  }
}