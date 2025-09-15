'use client';
import { useState } from 'react';

export default function NFTDetailModal({ nft, onClose, lastIntent }) {
  const [intentHistory, setIntentHistory] = useState([]);

  const createIntent = () => {
    const newIntent = { status: 'Pending...', time: new Date().toLocaleTimeString() };
    setIntentHistory([newIntent, ...intentHistory]);
    setTimeout(() => {
      const success = Math.random() > 0.2;
      newIntent.status = success ? 'Executed ✅' : 'Failed ❌';
      setIntentHistory([...intentHistory]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative shadow-2xl animate-fadeIn">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>✖</button>
        <img src={nft.image} alt={nft.name} className="rounded-md mb-4" />
        <h2 className="text-xl font-bold mb-2">{nft.name}</h2>
        <p className="mb-2">Owner: {nft.owner}</p>
        <p className="mb-4 font-semibold">Price: {nft.price} ETH</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" onClick={createIntent}>
          Create Intent
        </button>
        <div className="mt-4 max-h-40 overflow-y-auto">
          {intentHistory.map((intent, i) => (
            <p key={i} className="text-sm">{intent.time}: {intent.status}</p>
          ))}
        </div>
        {lastIntent && <p className="mt-2 font-medium">Last Intent: {lastIntent}</p>}
      </div>
    </div>
  );
}
