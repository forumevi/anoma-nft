// frontend/src/App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNfts();
  }, []);

  const loadNfts = async () => {
    try {
      const response = await axios.get('/api/nfts');
      setNfts(response.data);
    } catch (error) {
      console.error("Failed to load NFTs", error);
    }
  };

  const handleMint = async () => {
    if (!name || !file) {
      setMessage('Please enter name and select file');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // 1. Upload file to server (simulated — in real app, you'd upload to /upload endpoint)
      const tempFilePath = `/tmp/${Date.now()}_${file.name}`;

      // 2. Call mint API
      const response = await axios.post('/api/mint', {
        name,
        tempFilePath
      });

      setMessage(response.data.success ? '✅ NFT Minted Successfully!' : '❌ Mint Failed');
      loadNfts(); // Refresh NFT list
    } catch (error) {
      setMessage('❌ Mint failed: ' + (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  const createIntent = (nftId: string) => {
    alert(`Intent created for NFT #${nftId}! (Backend integration coming soon)`);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎨 Anoma Intent-NFT Engine</h1>
      <p>Dive into NFTs, create intents, and experience a cross-chain blockchain ecosystem.</p>

      <div style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h3>🚀 Mint Your NFT</h3>
        <input
          type="text"
          placeholder="NFT Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '0.5rem', width: '200px' }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button
          onClick={handleMint}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Minting...' : 'Mint NFT'}
        </button>
        {message && <p style={{ marginTop: '1rem', color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
      </div>

      <h2>Explore the Anoma NFT Universe</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        {nfts.length === 0 ? (
          <p>No NFTs minted yet. Be the first!</p>
        ) : (
          nfts.map((nft) => (
            <div key={nft.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3>Anoma NFT #{nft.id.split('_')[1]}</h3>
              <p><strong>Owner:</strong> {nft.owner.slice(0, 10)}...</p>
              <p><strong>Chain:</strong> {nft.chain}</p>
              <p><strong>Price:</strong> {nft.price} ETH</p>
              <p><strong>Total Intents:</strong> {nft.intents.length}</p>
              <button
                onClick={() => createIntent(nft.id)}
                style={{
                  padding: '0.3rem 0.6rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Create Intent
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '3rem', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
        <h3>Why Anoma?</h3>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h4>🌐 Cross-Chain Compatibility</h4>
            <p>Seamlessly interact with multiple blockchains within the Anoma ecosystem.</p>
          </div>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h4>🎯 Intent-Based Transactions</h4>
            <p>Create, track, and execute user intents efficiently on-chain.</p>
          </div>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h4>🔒 Secure & Decentralized</h4>
            <p>Enjoy fully decentralized NFT interactions with maximum security.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
