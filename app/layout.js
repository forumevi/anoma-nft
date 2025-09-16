import './globals.css';

export const metadata = {
  title: 'Anoma NFT Demo',
  description: 'NFT Marketplace Demo with Anoma Intents',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans">{children}</body>
    </html>
  );
}
