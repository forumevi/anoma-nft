'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NFTDetailModal({ nft, onClose }) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const createIntent = () => {
    setLoading(true);
    setStatus('Pending...');
    setTimeout(() => {
      setLoading(false);
      setStatus(Math.random() > 0.2 ? 'Executed ✅' : 'Failed ❌');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white rounded-2xl p-6 w-96 relative shadow-2xl"
      >
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
          ✖
        </button>

        <img src={nft.image} alt={nft.name} className="rounded-md mb-4 w-full h-80 object-cover" />

        <h2 className="text-xl font-bold mb-2">{nft.name}</h2>
        <p className="mb-2 text-gray-600">Owner: {nft.owner}</p>
        <p className="mb-4 font-semibold">{nft.price}</p>

        <button
          className={`relative w-full py-3 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 transition-transform flex items-center justify-center`}
          onClick={createIntent}
          disabled={loading}
        >
          {loading && (
            <span className="absolute left-4 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? 'Creating...' : 'Create Intent'}
        </button>

        {status && <p className="mt-3 font-medium text-center">{status}</p>}
      </motion.div>
    </div>
  );
}
