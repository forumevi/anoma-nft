'use client';
import { useState } from 'react';

export default function NFTDetailModal({ nft, onClose }) {
  const [status, setStatus] = useState('');

  const createIntent = () => {
    setStatus('Pending...');
    setTimeout(() => setStatus(Math.random() > 0.2 ? 'Executed ✅' : 'Failed ❌'), 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 relative shadow-2xl">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>✖</button>
        <img src={nft.image} alt={nft.name} className="rounded-md mb-4 w-full h-80 object-cover" />
        <h2 className="text-xl font-bold mb-2">{nft.name}</h2>
        <p className="mb-2 text-gray-600">Owner: {nft.owner}</p>
        <p className="mb-4 font-semibold">{nft.price}</p>
        <button
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform w-full"
          onClick={createIntent}
        >
          Create Intent
        </button>
        {status && <p className="mt-3 font-medium">{status}</p>}
      </div>
    </div>
  );
}
