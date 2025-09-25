// const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '')
const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://backend-hdvh.onrender.com/api').replace(/\/$/, '')

async function http(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    let message = `HTTP ${res.status}`
    try {
      const data = await res.json()
      message = data?.message || message
    } catch { }
    throw new Error(message)
  }
  try {
    return await res.json()
  } catch {
    return null
  }
}

export const api = {
  listBiodata: (filters = {}, page = 1, limit = 20) => {
    const params = new URLSearchParams()
    for (const [k, v] of Object.entries(filters)) {
      if (v !== undefined && v !== null && v !== '') params.set(k, v)
    }
    params.set('page', String(page))
    params.set('limit', String(limit))
    const qs = params.toString()
    return http(`/biodata?${qs}`).then((res) => {
      // Normalize older array-only responses (if backend not updated)
      if (Array.isArray(res)) {
        return { items: res, total: res.length, page, limit }
      }
      return res
    })
  },
  getBiodata: (id) => http(`/biodata/${id}`),
  createBiodata: (payload) => http('/biodata', { method: 'POST', body: payload }),
  updateBiodata: (id, payload) => http(`/biodata/${id}`, { method: 'PUT', body: payload }),
  deleteBiodata: (id) => http(`/biodata/${id}`, { method: 'DELETE' }),
}
