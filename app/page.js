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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">NFT Koleksiyonum</h1>
      <NFTGrid nfts={demoNFTs} />
    </div>
  );
}
