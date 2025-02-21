// models/Download.js
const mongoose = require('mongoose');

const DownloadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  songId: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
  downloadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Download", DownloadSchema);
