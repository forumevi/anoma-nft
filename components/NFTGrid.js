'use client';
import NFTCard from './NFTCard';
import { useState } from 'react';
import NFTDetailModal from './NFTDetailModal';
import { motion } from 'framer-motion';

export default function NFTGrid({ nfts = [] }) {
  const [selectedNFT, setSelectedNFT] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {nfts.map((nft, index) => (
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <NFTCard nft={nft} onClick={() => setSelectedNFT(nft)} />
          </motion.div>
        ))}
      </div>

      {selectedNFT && <NFTDetailModal nft={selectedNFT} onClose={() => setSelectedNFT(null)} />}
    </div>
  );
}
