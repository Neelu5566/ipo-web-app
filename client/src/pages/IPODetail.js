import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import Navbar from '../components/Navbar';

const IPODetail = () => {
  const { id } = useParams();
  const [ipo, setIpo] = useState(null);

  useEffect(() => {
    API.get(`ipo/${id}/`)
      .then(res => setIpo(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!ipo) return <div className="p-6 text-center text-gray-600">Loading IPO details...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 bg-white mt-6 shadow rounded">
        <div className="flex items-center gap-4 mb-4">
          {ipo.logo && (
            <img
              src={`${ipo.logo}`}
              alt="IPO Logo"
              className="w-20 h-20 object-contain border rounded"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold text-indigo-700">{ipo.company_name}</h2>
            <p className="text-sm text-gray-500">Status: {ipo.status}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p><strong>Price Band:</strong> ₹{ipo.price_band}</p>
          <p><strong>Issue Size:</strong> {ipo.issue_size}</p>
          <p><strong>Issue Type:</strong> {ipo.issue_type}</p>
          <p><strong>Open Date:</strong> {ipo.open_date}</p>
          <p><strong>Close Date:</strong> {ipo.close_date}</p>
          <p><strong>Listing Date:</strong> {ipo.listing_date}</p>
          <p><strong>IPO Price:</strong> ₹{ipo.ipo_price}</p>
          <p><strong>Listing Price:</strong> ₹{ipo.listing_price}</p>
          <p><strong>Current Market Price:</strong> ₹{ipo.current_market_price}</p>
        </div>

        <div className="mt-6">
          {ipo.rhp_pdf && (
            <a
              href={`${ipo.rhp_pdf}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline block"
            >
              📄 View RHP PDF
            </a>
          )}
          {ipo.drhp_pdf && (
            <a
              href={`${ipo.drhp_pdf}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline block"
            >
              📄 View DRHP PDF
            </a>
          )}
        </div>

        <Link
          to="/"
          className="inline-block mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default IPODetail;
