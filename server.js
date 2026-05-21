const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const GallerySchema = new mongoose.Schema({
  code: String,
  paid: Boolean,
  images: [String]
});

const Gallery = mongoose.model("Gallery", GallerySchema);

app.get("/api/gallery/:code", async (req, res) => {

  const gallery = await Gallery.findOne({
    code: req.params.code
  });

  if (!gallery) {
    return res.status(404).json({
      message: "Gallery not found"
    });
  }

  res.json(gallery);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Image Studio Gallery Running");
});

app.listen(5000, () => {
  console.log("Server running");
});