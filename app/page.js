// app/page.js — sadece bu bölümü değiştir
import { useState, useEffect } from 'react';
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

  // ... geri kalan JSX aynı kalır
}
