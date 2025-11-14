const API_BASE = "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Request failed (${resp.status}): ${text}`);
  }
  return resp.json();
}

export const api = {
  health: () => request("/health"),
  getItems: () => request("/items"),
  getItem: (id) => request(`/items/${id}`),
};

export default api;