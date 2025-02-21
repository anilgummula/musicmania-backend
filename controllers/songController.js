// controllers/songController.js
const Song = require("../models/Song");
const Download = require("../models/Download");

// Fetch all songs uploaded by other users
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().populate("uploadedBy", "username");
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Upload a new song
const uploadSong = async (req, res) => {
  try {
    const { title, artist } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = req.file.path; // Multer handles file uploads
    const uploadedBy = req.user.id; // User from auth middleware

    const song = new Song({ title, artist, fileUrl, uploadedBy });
    await song.save();
    
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload song" });
  }
};

// Register a song download
const downloadSong = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id;

    const download = new Download({ userId, songId });
    await download.save();
    
    res.status(201).json({ message: "Download registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register download" });
  }
};

// Fetch user's downloaded songs
const getUserDownloads = async (req, res) => {
  try {
    const downloads = await Download.find({ userId: req.user.id }).populate("songId");
    res.json(downloads);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch downloads" });
  }
};

// Correctly exporting functions
module.exports = { getAllSongs, uploadSong, downloadSong, getUserDownloads };
