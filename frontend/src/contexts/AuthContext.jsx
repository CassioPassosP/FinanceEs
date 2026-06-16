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

  const refreshProfile = async () => {
    if (!token) return;
    await loadProfile(token);
  };

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
        currentLevel: data.currentLevel,
        email: data.email,
        userType: data.profile_type,
        name: data.full_name || data.name || '',
        totalPoints: data.totalPoints || 0,
        profileType: data.profileType || 'moderado',
        monthlyBudget: data.monthlyBudget ?? 0
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
          currentLevel: 1,
          email,
          totalPoints: 0,
          profileType: profileType,
          monthlyBudget: 0,
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

    console.log(payload)

    const res = await fetch(`${API}/users/${user?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    let data = {};

    try {
      data = await res.json();
    } catch {
      data = {};
    }

    if (!res.ok) {
      throw new Error(data.message || 'Erro ao atualizar perfil');
    }

    setProfile(data);

    setUser((prev) => ({
      ...(prev || {}),
      id: data.id,
      currentLevel: data.currentLevel,
      email: data.email,
      totalPoints: data.totalPoints || 0,
      profileType: data.profileType || 'moderado',
      monthlyBudget: data.monthlyBudget ?? 0,
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
    refreshProfile,
    setUser,
    setProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
