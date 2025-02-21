const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const { fileURLToPath } = require('url');
const authrouter = require('./routes/authrouter.js');
const songrouter = require('./routes/song.js')

require('dotenv').config();
require('./models/db.js'); // Initialize database connection

// Fix __dirname in ES Module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json())
app.use(bodyParser.json());
// app.use(cors());
app.use(
    cors({
      origin: ["http://localhost:5173","https://musicmania2050.netlify.app"], // Allow only your frontend
      methods: "GET, POST, PUT, DELETE",
    //   credentials: true, // Allow cookies and authentication headers
    })
  );
  

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth",authrouter);
app.use("/songs",songrouter);

app.get("/",(req,res)=>{
    res.send("hello publicccccc....");
})

app.listen(PORT,()=>{
    console.log("listening at port",PORT);
});