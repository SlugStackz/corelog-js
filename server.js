const express = require("express");
const { addLog, getAllLogs, getLogById, deleteLog, getLogCount } = require("./logs");

const app = express();
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Get log count
app.get("/logs/count", (req, res) => {
  res.json({ count: getLogCount() });
});

// Get all logs
app.get("/logs", (req, res) => {
  const { title } = req.query;
  let logs = getAllLogs();

  if (title) {
    logs = logs.filter(log => log.title === title);
  }
  
  res.json(logs);
});

// Get one log by id
app.get("/logs/:id", (req, res) => {
  const id = Number(req.params.id);
  const log = getLogById(id);

  if (!log) {
    return res.status(404).json({ error: "Log not found" });
  }

  res.json(log);
});

// Create a new log
app.post("/logs", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "title and description are required" });
  }

  const created = addLog(title, description);
  res.status(201).json(created);
});

// Delete a log by id
app.delete("/logs/:id", (req, res) => {
  const id = Number(req.params.id);
  const ok = deleteLog(id);

  if (!ok) {
    return res.status(404).json({ error: "Log not found" });
  }

  res.json({ deleted: true });
});

const PORT = 3001; // changed from 3000 to avoid EADDRINUSE
app.listen(PORT, "127.0.0.1", () => {
  console.log(`✅ CoreLog API running on http://127.0.0.1:${PORT}`);
});
