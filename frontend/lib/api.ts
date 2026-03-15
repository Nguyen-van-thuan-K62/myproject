// Types cho API responses
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
}

const API_URL = "http://127.0.0.1:8000/api";

// Helper để lấy token (chỉ chạy ở client)
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
}

export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Register failed" }));
    throw new Error(error.message || "Register failed");
  }

  return res.json();
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Login failed" }));
    throw new Error(error.message || "Login failed");
  }

  return res.json();
}

export async function getMe(): Promise<User> {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}
