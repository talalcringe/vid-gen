import fetch from "node-fetch";
import 'dotenv/config';

const url = process.env.PING_URL || process.env.BACKEND_URL || 'https://your-backend-url.onrender.com/';

fetch(url)
  .then((res) => {
    console.log(`[${new Date().toISOString()}] Pinged ${url} - Status: ${res.status}`);
  })
  .catch((err) => {
    console.error("Ping failed:", err);
    process.exit(1);
  });
