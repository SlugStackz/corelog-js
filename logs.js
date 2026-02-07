const { loadLogs, saveLogs } = require("./storage");

let logs = loadLogs();

function addLog(title, description) {
  const nextId = logs.length === 0 ? 1 : Math.max(...logs.map(l => l.id)) + 1;

  const log = {
    id: nextId,
    title,
    description,
    createdAt: new Date().toISOString(),
  };

  logs.push(log);
  saveLogs(logs);
  return log;
}

function getLogCount () {
  return logs.length;
}

function getLatestLog () {
  if (logs.length === 0) return null;

  let latest = logs[0];
  for (const log of logs) {
    if (log.createdAt > latest.createdAt) {
      latest = log;
    }
  }
  return latest;
}
function getAllLogs() {
  return logs;
}

function getLogById(id) {
  return logs.find(log => log.id === id);
}

function deleteLog(id) {
  const index = logs.findIndex(log => log.id === id);
  if (index === -1) return false;

  logs.splice(index, 1);
  saveLogs(logs);
  return true;
}

function updateLog(id, updates) {
  const log = logs.find(l => l.id === id);
  if (!log) return null;

  if (updates.title !== undefined) {
    log.title = updates.title;
  }

  if (updates.description !== undefined) {
    log.description = updates.description;
  }

  saveLogs(logs);
  return log;
}

module.exports = { addLog, getAllLogs, getLogById, deleteLog, getLogCount, getLatestLog, updateLog };

