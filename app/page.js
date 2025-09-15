'use client';
import { useState } from 'react';
import NFTGrid from '../components/NFTGrid';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer';

export default function Page() {
  const demoNFTs = [
    { id: 1, name: 'Anoma NFT #1', owner: '0x123...', price: 0.5, image: '/images/nft1.png', badge: 'New' },
    { id: 2, name: 'Anoma NFT #2', owner: '0xabc...', price: 1.2, image: '/images/nft2.png', badge: 'Hot' },
    { id: 3, name: 'Anoma NFT #3', owner: '0xdef...', price: 0.8, image: '/images/nft3.png' },
    { id: 4, name: 'Anoma NFT #4', owner: '0x456...', price: 0.6, image: '/images/nft4.png', badge: 'Limited' },
    { id: 5, name: 'Anoma NFT #5', owner: '0x789...', price: 1.0, image: '/images/nft5.png' },
    { id: 6, name: 'Anoma NFT #6', owner: '0xaaa...', price: 2.0, image: '/images/nft6.png', badge: 'Hot' },
  ];

  const [filter, setFilter] = useState('all');

  const filteredNFTs = demoNFTs.filter((nft) => {
    if (filter === 'all') return true;
    if (filter === 'owned') return nft.owner.toLowerCase().startsWith('0x1');
    if (filter === 'high') return nft.price > 1;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-700 text-white relative overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-900 to-indigo-800 opacity-20 pointer-events-none"></div>

      {/* Navbar */}
      <Navbar onFilter={setFilter} />

      <div className="container mx-auto p-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 relative z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 via-purple-900 to-indigo-800 opacity-30 rounded-xl -z-10"></div>
          <img src="/logo.png" alt="Anoma" className="mx-auto w-32 mb-4" />
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Explore the Anoma NFT Universe
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-6">
            Dive into NFTs, create intents, and experience a cross-chain blockchain ecosystem.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:scale-105 transition"
          >
            Explore NFTs
          </button>
        </div>

        {/* NFT Grid */}
        <NFTGrid nfts={filteredNFTs} />

        {/* Feature Section */}
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

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
