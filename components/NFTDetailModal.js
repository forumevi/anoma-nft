'use client';
export default function NFTDetailModal({ nft, intents, onClose, createIntent }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative shadow-2xl animate-fadeIn">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>✖</button>
        <img src={nft.image} alt={nft.name} className="rounded-md mb-4" />
        <h2 className="text-xl font-bold mb-2">{nft.name}</h2>
        <p className="mb-2">Owner: {nft.owner}</p>
        <p className="mb-4 font-semibold">Price: {nft.price} ETH</p>

        <div className="flex justify-between">
          {['ethereum','polygon','optimism'].map(chain => (
            <button
              key={chain}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
              onClick={() => createIntent(chain)}
            >
              Create Intent on {chain}
            </button>
          ))}
        </div>

        <div className="mt-4 max-h-48 overflow-y-auto">
          {Object.entries(intents).map(([chain, arr]) =>
            arr.map((intent, i) => (
              <p key={`${chain}-${i}`} className="text-sm">
                {chain.toUpperCase()} | {intent.time}: {intent.status}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
