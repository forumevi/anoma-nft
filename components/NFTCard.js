'use client';
import { useState } from 'react';
import NFTDetailModal from './NFTDetailModal';

export default function NFTCard({ nft }) {
  const [showModal, setShowModal] = useState(false);
  const [lastIntent, setLastIntent] = useState(null);
  const [intentCount, setIntentCount] = useState(0);

  const createIntent = () => {
    setLastIntent('Pending...');
    setIntentCount(intentCount + 1);
    setTimeout(() => {
      const success = Math.random() > 0.2;
      setLastIntent(success ? 'Executed ✅' : 'Failed ❌');
    }, 1500);
  };

  return (
    <>
      <div 
        className="bg-gradient-to-r from-indigo-800 via-purple-900 to-indigo-800 rounded-2xl p-4 cursor-pointer hover:scale-105 transform transition shadow-lg hover:shadow-xl"
        onClick={() => setShowModal(true)}
      >
        <img src={nft.image} alt={nft.name} className="rounded-lg mb-4" />
        <h3 className="text-xl font-bold">{nft.name}</h3>
        <p className="text-gray-300">Owner: {nft.owner}</p>
        <p className="text-gray-200 font-semibold">Price: {nft.price} ETH</p>
        {nft.badge && <span className="inline-block bg-blue-500 px-2 py-1 text-xs rounded mt-2">{nft.badge}</span>}
        <p className="mt-2 text-sm text-gray-400">Intents: {intentCount}</p>
        {lastIntent && <p className="text-sm mt-1">{lastIntent}</p>}
        <button
          className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          onClick={(e) => { e.stopPropagation(); createIntent(); }}
        >
          Create Intent
        </button>
      </div>
      {showModal && <NFTDetailModal nft={nft} onClose={() => setShowModal(false)} lastIntent={lastIntent} />}
    </>
  );
}
