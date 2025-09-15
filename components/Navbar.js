'use client';

export default function Navbar({ onFilter }) {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-800 via-purple-900 to-indigo-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-2xl">Anoma NFT</div>
        <div className="flex space-x-4">
          <button
            onClick={() => onFilter('all')}
            className="bg-white text-indigo-800 px-4 py-2 rounded-lg hover:bg-indigo-100 transition"
          >
            All
          </button>
          <button
            onClick={() => onFilter('owned')}
            className="bg-white text-indigo-800 px-4 py-2 rounded-lg hover:bg-indigo-100 transition"
          >
            Owned
          </button>
          <button
            onClick={() => onFilter('high')}
            className="bg-white text-indigo-800 px-4 py-2 rounded-lg hover:bg-indigo-100 transition"
          >
            High Price
          </button>
        </div>
      </div>
    </nav>
  );
}
