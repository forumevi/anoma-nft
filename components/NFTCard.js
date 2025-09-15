// Bu dosya Vercel build’te bulunamadı
// Örnek içerik:

export default function NFTCard({ nft }) {
  return (
    <div className="card">
      <img src={nft.image} alt={nft.name} />
      <h3>{nft.name}</h3>
    </div>
  );
}
