import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Get token
      const res = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password,
      });

      const token = res.data.access;
      localStorage.setItem('access_token', token);

      // Step 2: Check if user is staff/admin
      const userInfo = await axios.get('http://127.0.0.1:8000/api/userinfo/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem('is_admin', userInfo.data.is_staff || userInfo.data.is_superuser);

      if (!userInfo.data.is_staff && !userInfo.data.is_superuser) {
        alert('❌ Access Denied: Not an admin account');
        localStorage.removeItem('access_token');
        return;
      }

      // Step 3: Proceed to admin dashboard
      alert('✅ Admin Login Successful!');
      navigate('/admin');

    } catch (err) {
      console.error(err);
      alert('❌ Login Failed. Please check admin credentials.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 to-white">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center text-indigo-700">Admin Login</h2>
        <input
          className="w-full p-2 border mb-3 rounded"
          type="text"
          placeholder="Admin Username"
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
        <button className="w-full bg-indigo-600 text-white py-2 rounded">Login as Admin</button>
      </form>
    </div>
  );
};

export default AdminLogin;
