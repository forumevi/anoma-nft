'use client';
import { useState, useEffect } from 'react';
import NFTGrid from '../components/NFTGrid';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer';
import { getNfts } from '../lib/api';

export default function Page() {
  const [nfts, setNfts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadNfts();
  }, []);

  const loadNfts = async () => {
    const data = await getNfts();
    setNfts(data);
  };

  const filteredNFTs = nfts.filter((nft) => {
    if (filter === 'all') return true;
    if (filter === 'owned') return nft.owner.toLowerCase().startsWith('0x1');
    if (filter === 'high') return parseFloat(nft.price) > 1;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-900 to-indigo-800 opacity-20 pointer-events-none"></div>

      <Navbar onFilter={setFilter} />

      <div className="container mx-auto p-6 relative z-10">
        <div className="text-center mb-12 relative z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 via-purple-900 to-indigo-800 opacity-30 rounded-xl -z-10"></div>
          <img src="/logo.png" alt="Anoma" className="mx-auto w-32 mb-4" />
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 animate-fadeIn">
            Explore the Anoma NFT Universe
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-6 animate-fadeIn delay-100">
            Dive into NFTs, create intents, and experience a cross-chain blockchain ecosystem.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:scale-105 transition transform"
          >
            Explore NFTs
          </button>
        </div>

        <NFTGrid nfts={filteredNFTs} />

        <div className="mt-16 mb-12 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Anoma?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Cross-Chain Compatibility" 
              description="Seamlessly interact with multiple blockchains within the Anoma ecosystem." 
              icon="🌐"
            />
            <FeatureCard 
              title="Intent-Based Transactions" 
              description="Create, track, and execute user intents efficiently on-chain." 
              icon="⚡"
            />
            <FeatureCard 
              title="Secure & Decentralized" 
              description="Enjoy fully decentralized NFT interactions with maximum security." 
              icon="🔒"
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
