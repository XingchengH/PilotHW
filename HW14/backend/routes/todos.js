const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const FILE = path.join(__dirname, "../todos.json");

// Get All todos
router.get("/", (req, res) => {
  try {
    if (!fs.existsSync(FILE)) {
      const starter = [
        {
          id: 1,
          description: "This is the Demo Todo Application",
          status: "In Progress",
          priority: "Low",
          timestamp: new Date().toISOString(),
        },
        {
          id: 2,
          description: "Click Completed to completing a todo",
          status: "In Progress",
          priority: "Medium",
          timestamp: new Date().toISOString(),
        },
        {
          id: 3,
          description: "Click Finish to finishing a todo",
          status: "In Progress",
          priority: "High",
          timestamp: new Date().toISOString(),
        },
      ];
      fs.writeFileSync(FILE, JSON.stringify(starter, null, 2));
      return res.json(starter);
    }

    const data = JSON.parse(fs.readFileSync(FILE, "utf-8"));

    // If file exists but is empty
    if (Array.isArray(data) && data.length === 0) {
      const starter = [
        {
          id: 1,
          description: "Welcome! Add your first task.",
          status: "In Progress",
          priority: "Low",
          timestamp: new Date().toISOString(),
        },
      ];
      fs.writeFileSync(FILE, JSON.stringify(starter, null, 2));
      return res.json(starter);
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to read todos" });
  }
});

router.post("/", (req, res) => {
  console.log(req.body);

  const { description, priority = "Medium" } = req.body;

  if (!description)
    return res.status(400).json({ error: "Description required" });

  const todos = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  const newTodo = {
    id: todos.length + 1,
    description,
    status: "In Progress",
    priority,
    timestamp: new Date().toISOString(),
  };

  todos.push(newTodo);
  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
  res.status(201).json(newTodo);
});

router
  .route("/:id")
  .delete((req, res) => {
    const id = parseInt(req.params.id);
    const todos = JSON.parse(fs.readFileSync(FILE, "utf-8"));
    const updated = todos.filter((todo) => todo.id !== id);
    fs.writeFileSync(FILE, JSON.stringify(updated, null, 2));
    res.json({ success: true });
  })
  .put((req, res) => {
    const id = parseInt(req.params.id);
    const todos = JSON.parse(fs.readFileSync(FILE, "utf-8"));
    const idx = todos.findIndex((todo) => todo.id === id);
    if (idx === -1) return res.status(404).json({ error: "Todo Not Found" });

    todos[idx].status = "Completed";
    fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
    res.json(todos[idx]);
  });

module.exports = router;
