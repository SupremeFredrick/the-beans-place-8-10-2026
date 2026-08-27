import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const TOKEN_KEY = "auth_token";

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }, [token]);

  const signIn = async (username, password) => {
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.token || "demo-token");
        setUser(data.user || { username });
        setLoading(false);
        return { ok: true, data };
      } else {
        const err = await res.json().catch(() => ({ message: "Sign-in failed" }));
        setLoading(false);
        return { ok: false, message: err.message || "Sign-in failed" };
      }
    } catch (err) {
      setLoading(false);
      // demo fallback (remove for production)
      if (username === "demo" && password === "demo") {
        setToken("demo-token");
        setUser({ username: "demo" });
        return { ok: true, data: { token: "demo-token", user: { username: "demo" } } };
      }
      return { ok: false, message: "Network error or backend not configured" };
    }
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
