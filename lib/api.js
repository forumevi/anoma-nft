// lib/api.js
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function mintNft(name, imagePath) {
  const res = await fetch(`${API_BASE}/api/mint`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, imagePath })
  });
  return res.json();
}

export async function getNfts() {
  const res = await fetch(`${API_BASE}/api/nfts`);
  return res.json();
}
