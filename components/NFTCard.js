'use client';

export default function NFTCard({ nft, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-xl transform transition duration-300 
                 hover:shadow-2xl hover:scale-105 hover:ring-2 hover:ring-indigo-400 cursor-pointer group relative"
    >
      {/* Badge */}
      {nft.badge && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          {nft.badge}
        </span>
      )}

      <div className="relative overflow-hidden">
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4 bg-gray-50">
        <h3 className="text-lg font-bold truncate">{nft.name}</h3>
        <p className="text-gray-500 truncate">Owner: {nft.owner}</p>
        <p className="font-semibold">{nft.price} ETH</p>
        <button className="mt-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg hover:scale-105 transition">
          Create Intent
        </button>
      </div>
    </div>
  );
}
