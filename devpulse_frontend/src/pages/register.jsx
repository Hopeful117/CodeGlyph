// src/pages/Register.js
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    try {
      await registerUser( username,
        password)
       
      
      navigate('/login');
    } catch (err) {
      setError("Error registering account.",err);
    }
  };

  return (
    <main className="register-page">
      <h1 className="ibm-plex-sans-title">Register</h1>
      <form onSubmit={handleRegister} className="form-container">
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button type="submit" className="filter-button">Register</button>
      </form>
    </main>
  );
};

export default Register;
