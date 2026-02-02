const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "logs.json");

function loadLogs() {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    // If file doesn't exist or is invalid, start empty
    return [];
  }
}

function saveLogs(logs) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(logs, null, 2), "utf8");
}

module.exports = { loadLogs, saveLogs };
