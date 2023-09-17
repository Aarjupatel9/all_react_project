const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const https = require("https");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "upload")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const uploadDirectory = path.join(__dirname, "upload");

//routes
app.get("/", (req, res) => {
  res.render("upload"); // Render the upload form using the "upload.ejs" template
});

app.get("/files", (req, res) => {

  fs.readdir(path.join(__dirname, "upload"), (err, files) => {
    if (err) {
      console.error("Error reading files:", err);
      res.status(500).send("Error reading files");
    } else {
      res.render("files", { files });
    }
  });
});

// Create the upload directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName); // File name on the server
  },
});

const upload = multer({ storage });

// POST endpoint for file upload
app.post("/upload", (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.error("Error uploading file: ", err);
      res.status(500).send("File upload failed.");
    } else {
      console.error("1 file uploaded");
      res.status(200).send("File uploaded successfully.");
    }
  });
});

// Start the server

const os = require("os");
function getIPAddress(interfaceName) {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.keys(interfaces)) {
    // console.log(iface);
    if (iface === interfaceName) {
      const add = interfaces[iface];
      console.log(iface);
      return add[0].address;
    }
  }
  return null;
}
// const wlanIPAddress = getIPAddress("Local Area Connection* 12");
const wlanIPAddress = getIPAddress("Wi-Fi");
console.log("WLAN IP address:", wlanIPAddress);

const privateKey = fs.readFileSync("./key.pem");
const certificate = fs.readFileSync("./cert.pem");
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
  console.log("Server is running on http://" + wlanIPAddress + ":443");
});
