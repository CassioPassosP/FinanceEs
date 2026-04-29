// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       
  const [profile, setProfile] = useState(null); 
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = import.meta.env.VITE_API_URL; 

  // Carrega /api/users/me e preenche user + profile
  const loadProfile = async (authToken) => {
    try {
      const res = await fetch(`${API}/users/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) {
        throw new Error('Não foi possível carregar o perfil');
      }

      const data = await res.json();
      setProfile(data);
      setUser({
        id: data.id,
        email: data.email,
        name: data.full_name || data.name || '',
      });
    } catch (err) {
      console.error('Erro ao carregar perfil:', err);
      setProfile(null);
      setUser(null);
    }
  };

  // Ao montar, ler token salvo e carregar perfil se existir
  useEffect(() => {
    const t = localStorage.getItem('token');

    if (!t) {
      setLoading(false);
      return;
    }

    setToken(t);

    loadProfile(t)
      .catch(() => {
        // token inválido → limpa tudo
        localStorage.removeItem('token');
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // LOGIN
  const signIn = async (email, password) => {
  setLoading(true);
  setError(null);

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const text = await res.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = { token: text };
    }

    if (!res.ok || !data.token) {
      throw new Error(data.message || 'Erro ao fazer login');
    }

    localStorage.setItem('token', data.token);
    setToken(data.token);

    await loadProfile(data.token);

    setLoading(false);
    return true;
  } catch (err) {
    console.error('Erro no login:', err);
    setError(err.message);
    setLoading(false);
    return false;
  }
  };

  // LOGOUT
  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setProfile(null);
  };

  // CADASTRO
  const signUp = async (fullName, email, password, profileType) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erro ao criar conta');
      }


      const loginOk = await signIn(email, password);

      setLoading(false);
      return loginOk;

    } catch (err) {
      console.error('Erro no cadastro:', err);
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  const updateProfile = async (payload) => {
    if (!token) throw new Error('Usuário não autenticado');

    const res = await fetch(`${API}/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Erro ao atualizar perfil');
    }

    // Atualiza estado global
    setProfile(data);
    setUser((prev) => ({
      ...(prev || {}),
      id: data.id,
      email: data.email,
      name: data.full_name || data.name || '',
    }));

    return data;
  };

  const value = {
    user,
    profile,
    token,
    loading,
    error,
    signIn,
    signOut,
    signUp,
    updateProfile,
    setUser,
    setProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
