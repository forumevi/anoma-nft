'use client';
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 via-purple-900 to-indigo-800 text-gray-200 py-10 mt-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <img src="/logo.png" alt="Anoma" className="w-24 mx-auto md:mx-0 mb-2" />
          <p className="text-sm">
            Explore the Anoma NFT ecosystem. Intent-based transactions, cross-chain compatibility, and secure decentralized interactions.
          </p>
        </div>
        <div className="flex space-x-6 text-2xl">
          <a href="https://twitter.com/anoma" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">🐦</a>
          <a href="https://discord.gg/anoma" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">💬</a>
          <a href="https://github.com/anoma" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">💻</a>
        </div>
      </div>
    </footer>
  );
}
