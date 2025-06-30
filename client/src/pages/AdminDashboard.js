import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const [ipos, setIpos] = useState([]);

  useEffect(() => {
    API.get('ipo/')
      .then((res) => setIpos(res.data))
      .catch((err) => console.error('Failed to fetch IPOs:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">📋 Admin Dashboard</h2>

        <div className="bg-white shadow-md rounded p-4 overflow-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-indigo-100 text-indigo-700">
                <th className="p-3">Company</th>
                <th className="p-3">Status</th>
                <th className="p-3">Open Date</th>
                <th className="p-3">Issue Size</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ipos.map((ipo) => (
                <tr key={ipo.id} className="border-b hover:bg-indigo-50">
                  <td className="p-3 font-medium">{ipo.company_name}</td>
                  <td className="p-3">{ipo.status}</td>
                  <td className="p-3">{ipo.open_date}</td>
                  <td className="p-3">{ipo.issue_size}</td>
                  <td className="p-3">
                    <Link
                      to={`/admin/edit/${ipo.id}`}
                      className="text-indigo-600 hover:underline text-sm"
                    >
                      ✏️ Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {ipos.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No IPOs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Link
          to="/admin/edit/new"
          className="inline-block mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Add New IPO
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
