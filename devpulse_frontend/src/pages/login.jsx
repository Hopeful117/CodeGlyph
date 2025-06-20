
import React, {useState } from 'react';
import { useAuth } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../api/auth';


const LoginPage = () => {
  const {login}=useAuth()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await loginUser(username,password)

    
    login()
  
    navigate('/');
  } catch (error) {
   setError(error.message || "Erreur inconnue lors de la connexion.");
  }
};
  return (
    <main className="login-page">
      <h1 className="ibm-plex-sans-title">Login</h1>
      <form onSubmit={handleLogin} className="form-container">
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="filter-button">Login</button>
      </form>
    </main>
  );
};

export default LoginPage;
