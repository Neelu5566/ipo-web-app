import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/register/', {
        username,
        password,
      });

      alert('✅ Account created! Please login.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('❌ Signup failed: ' + (err.response?.data?.error || 'Check console.'));
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-100 to-white">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center text-purple-700">Create New Account</h2>
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
        <button className="w-full bg-purple-600 text-white py-2 rounded">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
