const express = require("express");
const app = express();

const AuthRoute = require("./routes/Auth");
const UserRoute = require("./routes/Users");
const PostRoute = require("./routes/Posts");
const categoryRoute = require("./routes/Categories");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config();
const path = require("path");

//mongodb
const db = require("./connection/db");

db();

//middleware
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
//Router

// Routes middleware
app.use("/auth", AuthRoute);
app.use("/users", UserRoute);
app.use("/post", PostRoute);
app.use("/categories", categoryRoute);

//home
app.get("/", (req, res) => {
  res.status(200).send("WELCOME TO BLOG APPLICATION");
});

//multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});



//Multer is a node.js middleware for 
//handling multipart/form-data,
// which is primarily used for uploading files.
// It is written on top of busboy for maximum efficiency.



//port

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
