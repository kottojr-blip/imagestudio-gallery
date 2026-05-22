const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));
app.use("/uploads", express.static("public/uploads"));

const PORT = process.env.PORT || 5000;

// ==========================
// STORAGE
// ==========================

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },

  filename: function (req, file, cb) {

    const unique =
      Date.now() + "-" + file.originalname;

    cb(null, unique);
  }
});

const upload = multer({ storage });

// ==========================
// DEMO DATABASE
// ==========================

let galleries = {

  "IMG001": {

    paid: true,

    images: [
      "/uploads/IMG_5437.jpg"
      "/uploads/IMG_5488.jpg"
      "/uploads/IMG_5500.jpg"
	  "/uploads/IMG_5513.jpg"
	 
    ]
  },

  "IMG002": {

    paid: false,

    images: [
      "/uploads/sample4.jpg"
	   "/uploads/IMG_5525.jpg"
	 "/uploads/IMG_5526.jpg"
    ]
  }
};

// ==========================
// GET GALLERY
// ==========================

app.get("/api/gallery/:code", (req, res) => {

  const code = req.params.code;

  const gallery = galleries[code];

  if (!gallery) {

    return res.status(404).json({
      message: "Gallery not found"
    });
  }

  res.json(gallery);
});

// ==========================
// UPLOAD IMAGES
// ==========================

app.post(
  "/api/upload",
  upload.array("images", 20),

  (req, res) => {

    const code = req.body.code;

    const paid = req.body.paid === "true";

    const images = req.files.map(file => {
      return `/uploads/${file.filename}`;
    });

    galleries[code] = {
      paid,
      images
    };

    res.json({
      success: true,
      gallery: galleries[code]
    });
  }
);

// ==========================
// HOME
// ==========================

app.get("/", (req, res) => {

  res.sendFile(
    path.join(__dirname, "public/index.html")
  );
});

// ==========================
// START SERVER
// ==========================

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});