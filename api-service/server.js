const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());



// Connexion directe à MongoDB
mongoose.connect("mongodb://mongo:27017/musicdb");

// Schéma
const Track = mongoose.model("Track", new mongoose.Schema({
  title: String,
  artist: String,
  rank: Number,
  image: String,
  preview: String
}));


//path
const path = require("path");


// Fetch Deezer + Stocker dans Mongo
app.get("/send-data", async (req, res) => {
  try {
    const response = await axios.get("https://api.deezer.com/chart/0/tracks");
    const tracks = response.data.data.map((track) => ({
      title: track.title,
      artist: track.artist.name,
      rank: track.rank,
      image: track.album.cover_medium,
      preview: track.preview
    }));

    await Track.deleteMany({});
    await Track.insertMany(tracks);

    res.send("Données stockées dans MongoDB ✅");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer le top 10
app.get("/top10", async (req, res) => {
  try {
    const tracks = await Track.find().sort({ rank: -1 }).limit(10);
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Servir le fichier HTML
app.use(express.static(path.join(__dirname)));

app.listen(3000, () => console.log("API service running on port 3000"));