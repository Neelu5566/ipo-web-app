import React from 'react';
import { Link } from 'react-router-dom';

const IPOCard = ({ ipo }) => {
  return (
    <Link to={`/ipo/${ipo.id}`} className="block border p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{ipo.company_name}</h2>
      <p>Status: {ipo.status}</p>
    </Link>
  );
};

export default IPOCard;
