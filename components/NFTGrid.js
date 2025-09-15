'use client';
import NFTCard from './NFTCard';
import { useState } from 'react';
import NFTDetailModal from './NFTDetailModal';

export default function NFTGrid({ nfts = [] }) {
  const [selectedNFT, setSelectedNFT] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {nfts.map((nft) => (
          <NFTCard key={nft.id} nft={nft} onClick={() => setSelectedNFT(nft)} />
        ))}
      </div>

      {selectedNFT && <NFTDetailModal nft={selectedNFT} onClose={() => setSelectedNFT(null)} />}
    </div>
  );
}
