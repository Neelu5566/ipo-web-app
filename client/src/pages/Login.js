import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password,
      });

      const token = res.data.access;
      localStorage.setItem('access_token', token);

      // Fetch user info to check role
      const info = await axios.get('http://127.0.0.1:8000/api/userinfo/', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Save is_admin (false for normal users)
      localStorage.setItem('is_admin', info.data.is_staff || info.data.is_superuser);

      alert('✅ Login Successful!');
      navigate('/');
    } catch (err) {
      alert('❌ Login Failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 to-white">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center text-indigo-700">User Login</h2>
        <input
          className="w-full p-2 border mb-3 rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-2 border mb-4 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
