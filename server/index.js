require('dotenv').config();
const express = require('express');
const app = express();

// Basic security
app.use(express.json());

// Handle AI requests
app.post('/api/chat', async (req, res) => {
  const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
    headers: { 
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(req.body)
  });
  
  const data = await response.json();
  res.json(data);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));