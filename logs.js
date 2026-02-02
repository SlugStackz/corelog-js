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

module.exports = { addLog, getAllLogs, getLogById, deleteLog };
