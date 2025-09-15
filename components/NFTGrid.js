'use client';
import NFTCard from './NFTCard';
const NFTs = Array.from({ length: 10 }, (_, i) => ({
id: i + 1,
name: `NFT #${i + 1}`,
image: `https://via.placeholder.com/300x300?text=NFT+${i + 1}`,
owner: `0xOwner${i + 1}`,
price: `${(i + 1) * 0.1} ETH`
}));
export default function NFTGrid() {
return (
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
{NFTs.map(nft => <NFTCard key={nft.id} nft={nft} />)}
</div>
);
}