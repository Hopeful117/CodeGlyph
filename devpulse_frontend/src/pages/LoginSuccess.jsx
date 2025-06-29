// src/pages/LoginSuccess.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const LoginSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get('access');
    const refresh = params.get('refresh');

    if (access && refresh) {
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      login(); // mettre à jour le context
      navigate('/'); // rediriger vers l'accueil ou dashboard
    } else {
      navigate('/login'); // fallback si pas de token
    }
  }, [login, navigate]);

  return <p>Connexion en cours...</p>;
};

export default LoginSuccess;
