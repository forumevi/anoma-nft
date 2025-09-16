// lib/api.js
export async function mintNft(name, imagePath) {
  const res = await fetch('/api/mint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, imagePath })
  });
  return res.json();
}

export async function getNfts() {
  const res = await fetch('/api/nfts');
  return res.json();
}
