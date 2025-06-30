import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import Navbar from '../components/Navbar';

const Home = () => {
  const [ipos, setIpos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    API.get('ipo/')
      .then(res => setIpos(res.data))
      .catch(err => console.error('Failed to fetch IPOs:', err));
  }, []);

  const filteredIpos = ipos.filter((ipo) =>
    ipo.company_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white text-gray-900">
      <Navbar />

      <header className="bg-white py-10 text-center shadow-md">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-2">Explore Live & Upcoming IPOs</h2>
        <p className="text-gray-600">Search by company name, view IPO status & details</p>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        <input
          type="text"
          placeholder="Search IPOs by company name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {filteredIpos.length === 0 ? (
          <p className="text-center text-gray-500">No IPOs found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredIpos.map((ipo) => (
              <Link
                to={`/ipo/${ipo.id}`}
                key={ipo.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold text-indigo-600 mb-1">{ipo.company_name}</h3>
                <p className="text-sm text-gray-600">Status: {ipo.status}</p>
                <p className="text-sm text-gray-500">Price Band: ₹{ipo.price_band}</p>
                <p className="text-sm text-gray-500">Open Date: {ipo.open_date}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
