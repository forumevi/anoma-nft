// server/index.ts
import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.post('/api/mint', (req, res) => {
  const { name, tempFilePath } = req.body;

  if (!name || !tempFilePath) {
    return res.status(400).json({ error: "Name and tempFilePath required" });
  }

  const cliPath = path.join(__dirname, '../cli/anoma-nft.ts');
  const command = `npx ts-node ${cliPath} mint "${name}" "${tempFilePath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ CLI Error: ${error}`);
      return res.status(500).json({ error: error.message });
    }

    console.log(`✅ CLI Output: ${stdout}`);
    
    // Read DB to return latest NFT
    const dbPath = './db/nfts.json';
    if (fs.existsSync(dbPath)) {
      const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
      const latestNft = db[db.length - 1];
      return res.json({ success: true, nft: latestNft, log: stdout });
    }

    res.json({ success: true, message: "Minting completed", log: stdout });
  });
});

app.get('/api/nfts', (req, res) => {
  const dbPath = './db/nfts.json';
  if (!fs.existsSync(dbPath)) {
    return res.json([]);
  }
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  res.json(db);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend API & Frontend server running on http://localhost:${PORT}`);
});
