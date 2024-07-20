const { Router } = require("express");
const axios = require("axios");
const qs = require("qs");
const router = Router();
const express = require("express");

require("dotenv").config(); 

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

router.use(express.json()); // Middleware para manejar JSON

router.get("/auth/token", async (req, res) => {
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const authOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    data: qs.stringify({
      grant_type: "client_credentials",
    }),
    url: tokenUrl,
  };

  try {
    const response = await axios(authOptions);
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching token:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: "Failed to fetch token",
      details: error.response ? error.response.data : error.message,
    });
  }
});

router.post("/auth/callback", async (req, res) => {
  const code = req.body.code;

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const authOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    data: qs.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
    }),
    url: tokenUrl,
  };

  try {
    const response = await axios(authOptions);
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error during Spotify callback:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: "Failed to exchange code for token",
      details: error.response ? error.response.data : error.message,
    });
  }
});

module.exports = router;
