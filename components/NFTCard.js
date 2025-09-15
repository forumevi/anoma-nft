'use client';

export default function NFTCard({ nft, onClick }) {
  return (
    <div
      className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <img src={nft.image} alt={nft.name} className="rounded-md mb-2 w-full h-48 object-cover" />
      <h3 className="text-lg font-bold">{nft.name}</h3>
      <p className="text-sm text-gray-600">Owner: {nft.owner}</p>
      <p className="text-sm font-semibold">Price: {nft.price}</p>
    </div>
  );
}
