const express = require("express");
const router = express.Router();
const {
  getAllSongs,
  uploadSong,
  downloadSong,
  getUserDownloads,
} = require("../controllers/songController.js");

const cloudinary = require("../cloudinaryConfig.js");
const Song = require("../models/Song"); // Ensure you have a Song model
const authMiddleware = require("../middlewares/authMiddleware.js");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Multer to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "musicmaina/songs",
    resource_type: "auto", // Allows audio uploads
  },
});

const upload = multer({ storage });

// ✅ Fixed: Upload route with authentication
router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const { title, artist } = req.body;
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "File upload failed" });
    }

    const newSong = new Song({
      title,
      artist,
      fileUrl: req.file.path, // Store Cloudinary URL
    });

    await newSong.save();
    res.json({ message: "Song uploaded successfully!", song: newSong });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Other routes
router.get("/", getAllSongs);
router.post("/download", authMiddleware, downloadSong);
router.get("/downloads", authMiddleware, getUserDownloads);

module.exports = router;
