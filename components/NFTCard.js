'use client';
import { useState } from 'react';
import NFTDetailModal from './NFTDetailModal';

const chains = ['ethereum', 'polygon', 'optimism'];

export default function NFTCard({ nft }) {
  const [showModal, setShowModal] = useState(false);
  const [lastIntent, setLastIntent] = useState(null);
  const [intents, setIntents] = useState(nft.intents);

  const createIntent = (chain = chains[Math.floor(Math.random() * chains.length)]) => {
    const newIntent = { status: 'Pending...', time: new Date().toLocaleTimeString() };
    setIntents(prev => ({
      ...prev,
      [chain]: [newIntent, ...(prev[chain] || [])]
    }));
    setLastIntent(`${chain.toUpperCase()}: Pending...`);

    setTimeout(() => {
      const success = Math.random() > 0.2;
      newIntent.status = success ? 'Executed ✅' : 'Failed ❌';
      setIntents(prev => ({ ...prev }));
      setLastIntent(`${chain.toUpperCase()}: ${newIntent.status}`);
    }, 1500);
  };

  const totalIntents = chains.reduce((sum, chain) => sum + (intents[chain]?.length || 0), 0);

  return (
    <>
      <div
        className="bg-gradient-to-r from-indigo-800 via-purple-900 to-indigo-800 rounded-2xl p-4 cursor-pointer hover:scale-105 transform transition shadow-lg hover:shadow-xl"
        onClick={() => setShowModal(true)}
      >
        <img src={nft.image_uri || nft.image} alt={nft.name} className="rounded-lg mb-4" />
        <h3 className="text-xl font-bold">{nft.name}</h3>
        <p className="text-gray-300">Owner: {nft.owner}</p>
        <p className="text-gray-200 font-semibold">Price: {nft.price} ETH</p>
        <p className="mt-2 text-sm text-gray-400">Total Intents: {totalIntents}</p>
        {lastIntent && <p className="text-sm mt-1">{lastIntent}</p>}
        <button
          className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          onClick={(e) => { e.stopPropagation(); createIntent(); }}
        >
          Create Intent
        </button>
      </div>
      {showModal && <NFTDetailModal nft={nft} intents={intents} onClose={() => setShowModal(false)} createIntent={createIntent} />}
    </>
  );
}
