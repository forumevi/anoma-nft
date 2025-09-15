'use client';
import NFTGrid from '../components/NFTGrid';

export default function Page() {
  const demoNFTs = [
    { id: 1, name: 'Anoma NFT #1', owner: '0x123...', price: '0.5 ETH', image: '/images/nft1.png' },
    { id: 2, name: 'Anoma NFT #2', owner: '0xabc...', price: '1.2 ETH', image: '/images/nft2.png' },
    { id: 3, name: 'Anoma NFT #3', owner: '0xdef...', price: '0.8 ETH', image: '/images/nft3.png' },
    { id: 4, name: 'Anoma NFT #4', owner: '0x456...', price: '0.6 ETH', image: '/images/nft4.png' },
    { id: 5, name: 'Anoma NFT #5', owner: '0x789...', price: '1.0 ETH', image: '/images/nft5.png' },
    { id: 6, name: 'Anoma NFT #6', owner: '0xaaa...', price: '2.0 ETH', image: '/images/nft6.png' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-700 text-white relative overflow-hidden">
      {/* Overlay Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-900 to-indigo-800 opacity-20 pointer-events-none"></div>

      <div className="container mx-auto p-6 relative z-10">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Anoma" className="mx-auto w-32" />
          <h1 className="text-4xl font-bold mt-4">Anoma NFT Koleksiyonu</h1>
          <p className="mt-2 text-gray-200">
            Explore NFTs and create intents on the Anoma blockchain.
          </p>
        </div>

        <NFTGrid nfts={demoNFTs} />
      </div>
    </div>
  );
}
