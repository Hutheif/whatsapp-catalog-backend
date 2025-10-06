import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Import CORS

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const CATALOG_ID = process.env.CATALOG_ID;

// ✅ Enable CORS (allow frontend requests)
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "https://your-frontend-domain.vercel.app",
    ], // add both local + deployed URLs
  })
);

app.get("/", (req, res) => {
  res.send("✅ WhatsApp Catalog API is live!");
});

app.get("/api/products", async (req, res) => {
  try {
    const url = `https://graph.facebook.com/v21.0/${CATALOG_ID}/products?access_token=${ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching catalog:", error);
    res.status(500).json({ error: "Failed to fetch catalog" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
