import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import Navbar from '../components/Navbar';

const EditIPO = () => {
  const { id } = useParams(); // "new" or ID
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company_name: '',
    price_band: '',
    open_date: '',
    close_date: '',
    issue_size: '',
    issue_type: '',
    listing_date: '',
    status: 'upcoming',
    ipo_price: '',
    listing_price: '',
    current_market_price: '',
  });

  const [logo, setLogo] = useState(null);
  const [rhp, setRhp] = useState(null);
  const [drhp, setDrhp] = useState(null);

  useEffect(() => {
    if (id !== 'new') {
      API.get(`ipo/${id}/`).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (logo) data.append('logo', logo);
    if (rhp) data.append('rhp_pdf', rhp);
    if (drhp) data.append('drhp_pdf', drhp);

    try {
      if (id === 'new') {
        await API.post('ipo/', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await API.put(`ipo/${id}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      alert('✅ IPO saved successfully!');
      navigate('/admin');
    } catch (error) {
      console.error('Error saving IPO:', error);
      alert('❌ Failed to save IPO. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded mt-6">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">
          {id === 'new' ? '➕ Add New IPO' : '✏️ Edit IPO'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border p-2 rounded" name="company_name" value={form.company_name} onChange={handleChange} placeholder="Company name" />
            <input className="border p-2 rounded" name="price_band" value={form.price_band} onChange={handleChange} placeholder="Price band" />
            <input className="border p-2 rounded" type="date" name="open_date" value={form.open_date} onChange={handleChange} />
            <input className="border p-2 rounded" type="date" name="close_date" value={form.close_date} onChange={handleChange} />
            <input className="border p-2 rounded" name="issue_size" value={form.issue_size} onChange={handleChange} placeholder="Issue size" />
            <input className="border p-2 rounded" name="issue_type" value={form.issue_type} onChange={handleChange} placeholder="Issue type" />
            <input className="border p-2 rounded" type="date" name="listing_date" value={form.listing_date} onChange={handleChange} />
            <select className="border p-2 rounded" name="status" value={form.status} onChange={handleChange}>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="listed">Listed</option>
            </select>
            <input className="border p-2 rounded" name="ipo_price" value={form.ipo_price} onChange={handleChange} placeholder="IPO price" />
            <input className="border p-2 rounded" name="listing_price" value={form.listing_price} onChange={handleChange} placeholder="Listing price" />
            <input className="border p-2 rounded" name="current_market_price" value={form.current_market_price} onChange={handleChange} placeholder="Current market price" />
          </div>

          <div className="space-y-2">
            <label className="block">Logo: <input type="file" onChange={(e) => setLogo(e.target.files[0])} /></label>
            <label className="block">RHP PDF: <input type="file" onChange={(e) => setRhp(e.target.files[0])} /></label>
            <label className="block">DRHP PDF: <input type="file" onChange={(e) => setDrhp(e.target.files[0])} /></label>
          </div>

          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            {id === 'new' ? 'Save IPO' : 'Update IPO'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditIPO;
