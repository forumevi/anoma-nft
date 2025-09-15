'use client';


import NFTGrid from '../components/NFTGrid';


// Demo NFT verisi
const demoNFTs = [
{
id: 1,
name: 'Anoma NFT #1',
owner: '0x123...',
price: '0.5 ETH',
image: '/images/nft1.png'
},
{
id: 2,
name: 'Anoma NFT #2',
owner: '0xabc...',
price: '1.2 ETH',
image: '/images/nft2.png'
},
{
id: 3,
name: 'Anoma NFT #3',
owner: '0xdef...',
price: '0.8 ETH',
image: '/images/nft3.png'
}
];


export default function Page() {
return <NFTGrid nfts={demoNFTs} />;
}
