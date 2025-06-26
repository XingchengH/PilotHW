const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const FILE = path.join(__dirname, "../todos.json");

if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "[]");

// Get All todos
router.get("/", (req, res) => {
  const todos = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  res.json(todos);
});

router.post("/", (req, res) => {
  const { description } = req.body;
  if (!description)
    return res.status(400).json({ error: "Description required" });

  const todos = JSON.parse(fs.readFileSync(FILE, "utf-8"));
});
