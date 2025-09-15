'use client';

export default function NFTCard({ nft, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
    >
      <img src={nft.image} alt={nft.name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold truncate">{nft.name}</h3>
        <p className="text-sm text-gray-500 truncate">Owner: {nft.owner}</p>
        <p className="text-sm font-semibold">{nft.price}</p>
        <button
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Create Intent
        </button>
      </div>
    </div>
  );
}
