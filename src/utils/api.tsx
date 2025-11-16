export const API_URL = "https://localhost:7083/api";

async function handleResponse(res: Response) {
  if (!res.ok) {
    let errorMessage = "Lỗi không xác định";
    try {
      const text = await res.text();
      if (text) {
        const error = JSON.parse(text);
        errorMessage = error?.title || error?.message || text;
      } else {
        errorMessage = `HTTP ${res.status}: ${res.statusText}`;
      }
    } catch (e) {
      errorMessage = `HTTP ${res.status}: ${res.statusText}`;
    }
    console.error("API Error:", {
      status: res.status,
      statusText: res.statusText,
      message: errorMessage,
    });
    throw new Error(errorMessage);
  }
  return res.status !== 204 ? res.json() : null;
}

function getHeaders(token?: string) {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function apiGet(path: string, token?: string) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: getHeaders(token),
  });
  return handleResponse(res);
}

export async function apiGetById(path: string, id: number, token?: string) {
  const res = await fetch(`${API_URL}${path}/${id}`, {
    method: "GET",
    headers: getHeaders(token),
  });
  return handleResponse(res);
}

export async function apiPost(path: string, body: any, token?: string) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function apiPut(path: string, body: any, token?: string) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function apiPatch(path: string, body: any, token?: string) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PATCH",
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function apiDelete(path: string, token?: string) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  return handleResponse(res);
}