#!/usr/bin/env ts-node

import { Command } from 'commander';
import { create } from 'ipfs-http-client';
import axios from 'axios';
import dotenv from 'dotenv';
import { AnomaClient } from '@anoma/cli';
import { TxNftMint } from '@anoma/types';
import fs from 'fs';

dotenv.config();

const program = new Command();

// IPFS Client
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});

// Zincir yapılandırması
const CHAINS = [
  { name: 'Ethereum', gasPriceUrl: 'https://api.etherscan.io/api?module=proxy&action=eth_gasPrice', feeToken: 'ETH', avgBlockTime: 13 },
  { name: 'Polygon', gasPriceUrl: 'https://polygon-rpc.com/', feeToken: 'MATIC', avgBlockTime: 2 },
  { name: 'Cosmos', gasPriceUrl: 'https://rest.cosmos.directory/cosmoshub', feeToken: 'ATOM', avgBlockTime: 6 },
];

interface ChainOption {
  name: string;
  gasPrice: number;
  avgBlockTime: number;
  feeToken: string;
  estimatedCost: number;
}

async function getGasPrice(chain: any): Promise<number> {
  try {
    if (chain.name === 'Ethereum') {
      const res = await axios.get(chain.gasPriceUrl);
      return parseInt(res.data.result, 16) / 1e9;
    }
    if (chain.name === 'Polygon') {
      return 30; // gwei — geliştirilecek
    }
    if (chain.name === 'Cosmos') {
      return 0.025;
    }
    return 1.0;
  } catch (e) {
    console.warn(`⚠️ Could not fetch gas for ${chain.name}, using default.`);
    return 1.0;
  }
}

async function selectOptimalChain(): Promise<ChainOption> {
  console.log(`\n🌍 Analyzing chains for optimal minting...`);

  const chainData = await Promise.all(
    CHAINS.map(async (chain) => {
      const gasPrice = await getGasPrice(chain);
      const estimatedCost = gasPrice * 0.0001;
      return {
        ...chain,
        gasPrice,
        estimatedCost,
      };
    })
  );

  const sorted = chainData.sort((a, b) => a.estimatedCost - b.estimatedCost);
  const best = sorted[0];

  console.log(`✅ Optimal chain selected: ${best.name}`);
  console.log(`💰 Estimated cost: ${best.estimatedCost} ${best.feeToken}\n`);

  return best;
}

async function uploadToIPFS(filePath: string): Promise<string> {
  console.log(`⬆️ Uploading file to IPFS: ${filePath}`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath);
  const { cid } = await ipfs.add(fileContent);
  const uri = `ipfs://${cid.toString()}`;

  console.log(`✅ File uploaded: ${uri}\n`);
  return uri;
}

async function generateMetadata(name: string, imageUri: string): Promise<string> {
  const metadata = {
    name,
    description: `Anoma NFT — minted via intent`,
    image: imageUri,
    attributes: [
      { trait_type: "Minted Via", value: "Anoma Intent Engine" },
      { trait_type: "Cross-Chain", value: "Yes" }
    ]
  };

  const metadataJson = JSON.stringify(metadata);
  const { cid } = await ipfs.add(metadataJson);
  const metadataUri = `ipfs://${cid.toString()}`;

  console.log(`📄 Metadata generated: ${metadataUri}\n`);
  return metadataUri;
}

function saveNftRecord(nftData: any) {
  const dbPath = './db/nfts.json';
  let db = [];

  if (fs.existsSync(dbPath)) {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    db = JSON.parse(raw);
  }

  const record = {
    id: nftData.token_id,
    name: nftData.name,
    image_uri: nftData.imageUri,
    metadata_uri: nftData.metadataUri,
    owner: nftData.owner,
    chain: nftData.chain.name,
    price: "0",
    intents: []
  };

  db.push(record);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log(`💾 NFT record saved to database.\n`);
}

async function mintNft(name: string, imageUri: string, chain: ChainOption) {
  const owner = process.env.DEFAULT_OWNER!;
  const token_id = `nft_${Date.now()}`;
  const metadataUri = await generateMetadata(name, imageUri);

  const client = new AnomaClient();

  const tx: TxNftMint = {
    owner,
    token_id,
    metadata_uri: metadataUri,
  };

  console.log(`\n🪙 Minting NFT on ${chain.name}...`);
  console.log(`🖼️  Image: ${imageUri}`);
  console.log(`📄 Meta: ${metadataUri}`);

  try {
    const result = await client.nft.mint(tx);

    console.log(`\n🎉 Success!`);
    console.log(`🔗 Tx: https://testnet.anoma.net/tx/${result.hash}`);
    console.log(`🖼️ View NFT: https://anoma.zone/nft/${token_id}\n`);

    saveNftRecord({
      name,
      imageUri,
      metadataUri,
      owner,
      chain,
      token_id
    });

    return result;
  } catch (error) {
    console.error(`❌ Mint failed:`, error.message || error);
    process.exit(1);
  }
}

program
  .name('anoma-nft')
  .description('CLI to mint NFTs via intents — cross-chain, automated, simple.')
  .version('1.0.0');

program
  .command('mint')
  .description('Express intent to mint an NFT. We handle chain, gas, upload.')
  .argument('<name>', 'NFT name')
  .argument('<imagePath>', 'Local path to image file')
  .option('-c, --chain <chainName>', 'Force specific chain (Ethereum, Polygon, Cosmos)')
  .action(async (name, imagePath, options) => {
    console.log(`\n🎯 Intent received: "Mint NFT named '${name}'"\n`);

    let chain: ChainOption;

    if (options.chain) {
      const found = CHAINS.find(c => c.name === options.chain);
      if (!found) {
        console.error(`❌ Chain not supported: ${options.chain}`);
        process.exit(1);
      }
      chain = { ...found, gasPrice: 1, estimatedCost: 0.1 };
    } else {
      chain = await selectOptimalChain();
    }

    const imageUri = await uploadToIPFS(imagePath);
    await mintNft(name, imageUri, chain);
  });

program.parse();
