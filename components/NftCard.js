'use client';
import { useState } from 'react';
import NFTDetailModal from './NFTDetailModal';
export default function NFTCard({ nft }) {
const [open, setOpen] = useState(false);
return (
<>
<div className="bg-white rounded-lg shadow p-3 cursor-pointer hover:shadow-lg" onClick={() => setOpen(true)}>
<img src={nft.image} alt={nft.name} className="rounded-md mb-2" />
<h2 className="font-semibold">{nft.name}</h2>
<p className="text-sm text-gray-500">Owner: {nft.owner}</p>
<p className="text-sm font-bold">Price: {nft.price}</p>
</div>
{open && <NFTDetailModal nft={nft} onClose={() => setOpen(false)} />}
</>
);
}