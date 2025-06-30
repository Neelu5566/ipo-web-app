import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('is_admin') === 'true');

  // Update on page navigation (login/logout)
  useEffect(() => {
    setToken(localStorage.getItem('access_token'));
    setIsAdmin(localStorage.getItem('is_admin') === 'true');
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('is_admin');
    setToken(null);
    setIsAdmin(false);
    alert('👋 Logged out');
    navigate('/');
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 shadow flex justify-between items-center">
      <h1 className="text-xl font-bold">📈 IPO Web App</h1>
      <div className="space-x-4 text-sm">
        <Link to="/" className="hover:underline">Home</Link>

        {!token ? (
          <>
            <Link to="/signup" className="hover:underline">Signup</Link>
            <Link to="/login" className="hover:underline">User Login</Link>
            <Link to="/admin-login" className="hover:underline">Admin Login</Link>
          </>
        ) : (
          <>
            {isAdmin && (
              <Link to="/admin" className="hover:underline">Dashboard</Link>
            )}
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
