'use client';
export default function Navbar({ onFilter }) {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-indigo-800 via-purple-900 to-indigo-800 sticky top-0 z-50 shadow-lg">
      <div className="text-2xl font-bold text-white">Anoma NFT</div>
      <div className="space-x-4">
        <button onClick={() => onFilter('all')} className="text-white hover:text-gray-200">All</button>
        <button onClick={() => onFilter('owned')} className="text-white hover:text-gray-200">Owned</button>
        <button onClick={() => onFilter('high')} className="text-white hover:text-gray-200">High Price</button>
      </div>
    </nav>
  );
}
