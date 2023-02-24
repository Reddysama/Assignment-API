const express = require("express");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/basketball", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB"));

// Define the player schema
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, required: true },
  rebounds: { type: Number, required: true },
  assists: { type: Number, required: true },
  blocks: { type: Number, required: true },
});

// Define the player model
const Player = mongoose.model("Player", playerSchema);

// Create an Express application
const app = express();
app.use(express.json());

// Create a route to add a new player
app.post("/api/players", async (req, res) => {
  const player = new Player({
    name: req.body.name,
    points: req.body.points,
    rebounds: req.body.rebounds,
    assists: req.body.assists,
    blocks: req.body.blocks,
  });

  try {
    await player.save();
    res.send(player);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create a route to update a player
app.put("/api/players/:id", async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(player);
  } catch (err) {
    res.status(404).send("Player not found");
  }
});

// Create a route to delete a player
app.delete("/api/players/:id", async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    res.send(player);
  } catch (err) {
    res.status(404).send("Player not found");
  }
});

// Create a route to get the player with the most points
app.get("/api/players/most-points", async (req, res) => {
  try {
    const player = await Player.findOne().sort({ points: -1 });
    res.send(player);
  } catch (err) {
    res.status(404).send("No players found");
  }
});

// Create a route to get the player with the most rebounds
app.get("/api/players/most-rebounds", async (req, res) => {
  try {
    const player = await Player.findOne().sort({ rebounds: -1 });
    res.send(player);
  } catch (err) {
    res.status(404).send("No players found");
  }
});

// Create a route to get the player with the most assists
app.get("/api/players/most-assists", async (req, res) => {
  try {
    const player = await Player.findOne().sort({ assists: -1 });
    res.send(player);
  } catch (err) {
    res.status(404).send("No players found");
  }
});

// Create a route to get the player with the most blocks
app.get("/api/players/most-blocks", async (req, res) => {
  try {
    const player =
