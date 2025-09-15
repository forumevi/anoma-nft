'use client';

export default function NFTCard({ nft, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer"
    >
      <img src={nft.image} alt={nft.name} className="w-full h-64 object-cover" />
      <div className="p-4 bg-gray-50">
        <h3 className="text-lg font-bold truncate">{nft.name}</h3>
        <p className="text-gray-500 truncate">Owner: {nft.owner}</p>
        <p className="font-semibold">{nft.price}</p>
        <button className="mt-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg hover:scale-105 transition">
          Create Intent
        </button>
      </div>
    </div>
  );
}
