const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const PORT = process.env.PORT || 5000;
var fs = require('fs');


app.set("view engine", "ejs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const maxSize = 1 * 1024 * 1024; // for 1MB

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: { fileSize: maxSize },
}).single('file');

app.put("/upload",(req, res) => {
  
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.send(err)
    } else if (err) {
      res.send(err)
    }
    console.log(req.file)
  })
});
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/delete-file", (req,res) => {
  console.log(__dirname)
  fs.unlink('public/uploads/sarthak.jpg', function (err) {
    if (err) throw err;
    console.log('File deleted!');
  });
})

app.post("/rename-file", (req,res) => {
  fs.rename('public/uploads/file-1634538657958.jpg', 'public/uploads/sarthak.jpg', function (err) {
    if (err) throw err;
    console.log('File Renamed!');
  });
  
})



app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});
 