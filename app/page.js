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
  const [nftName, setNftName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintMessage, setMintMessage] = useState('');

  useEffect(() => {
    loadNfts();
  }, []);

  const loadNfts = async () => {
    const data = await getNfts();
    setNfts(data);
  };

  const handleImageUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleMint = async () => {
    if (!nftName || !selectedFile) {
      setMintMessage('⚠️ Please enter name and select image');
      return;
    }

    setIsMinting(true);
    setMintMessage('');

    const formData = new FormData();
    formData.append('name', nftName);
    formData.append('image', selectedFile);

    try {
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!uploadRes.ok) throw new Error('Image upload failed');

      const { imagePath } = await uploadRes.json();

      const mintRes = await fetch('/api/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nftName, imagePath })
      });

      const result = await mintRes.json();

      if (result.success) {
        setMintMessage(`🎉 Success! NFT #${result.nft.id.split('_')[1]} minted.`);
        loadNfts();
        setNftName('');
        setSelectedFile(null);
      } else {
        setMintMessage(`❌ Mint failed: ${result.error}`);
      }
    } catch (error) {
      setMintMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsMinting(false);
    }
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
        
        {/* 🎯 MINT FORMU */}
        <div className="mb-8 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-4 text-center">🪄 Mint Your Shrimpers NFT</h3>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input
              type="text"
              placeholder="NFT Name (e.g., Shrimpers NFT #7)"
              value={nftName}
              onChange={(e) => setNftName(e.target.value)}
              className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            <button
              onClick={handleMint}
              disabled={isMinting}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isMinting ? '⏳ Minting...' : '✅ Mint NFT'}
            </button>
          </div>
          {mintMessage && (
            <p className={`mt-3 text-center font-medium ${mintMessage.includes('Success') ? 'text-green-400' : 'text-red-400'}`}>
              {mintMessage}
            </p>
          )}
        </div>

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
