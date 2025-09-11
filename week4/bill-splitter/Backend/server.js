import express from "express";
import multer from "multer";
import cors from "cors";
import fetch from "node-fetch";
import fs from "fs";

const app = express();
const PORT = 5000;

// Enable CORS for frontend
app.use(cors());

// File upload setup
const upload = multer({ dest: "uploads/" });

// Route: Scan receipt
app.post("/api/scan", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const imageBase64 = fs.readFileSync(filePath, { encoding: "base64" });

    // Send request to LLaMA API (adjust with your provider’s endpoint + key)
    const llamaResponse = await fetch("https://api.llama.ai/v1/parse", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.LLAMA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3-vision", // Example model
        prompt: "Extract all items and prices from this bill/receipt.",
        image: imageBase64,
      }),
    });

    const result = await llamaResponse.json();
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error scanning receipt" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
