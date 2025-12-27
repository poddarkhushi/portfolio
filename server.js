const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const messagesFile = path.join(__dirname, "messages.json");

// POST /contact → Save the message
app.post("/contact", (req, res) => {
  console.log("Received request:", req.body);

  const newMessage = {
    name: req.body.name,
    message: req.body.message,
    date: new Date().toISOString()
  };

  fs.readFile(messagesFile, "utf8", (err, data) => {
    if (err) {
      console.error("Read error:", err);
      return res.status(500).json({ success: false });
    }

    let messages = [];
    try {
      messages = JSON.parse(data);
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr);
      return res.status(500).json({ success: false });
    }

    messages.push(newMessage);

    fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        console.error("Write error:", err);
        return res.status(500).json({ success: false });
      }

      console.log("Saved message:", newMessage);
      res.json({ success: true, message: "Message saved!" });
    });
  });
});

// GET /messages → Return saved messages
app.get("/messages", (req, res) => {
  fs.readFile(messagesFile, "utf8", (err, data) => {
    if (err) {
      console.error("Read error:", err);
      return res.status(500).json({ success: false });
    }

    try {
      res.json(JSON.parse(data));
    } catch (jsonErr) {
      console.error("JSON parse error:", jsonErr);
      res.status(500).json({ success: false });
    }
  });
});

// IMPORTANT: Listen on IPv4 (fixes ERR_CONNECTION_REFUSED on Windows!)
app.listen(5000, "127.0.0.1", () => {
  console.log("Message storage server running at http://127.0.0.1:5000");
});
