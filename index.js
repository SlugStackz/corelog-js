// CoreLog v1 — CRUD-ish in memory

const logs = [];

function addLog(title, description) {
  const log = {
    id: logs.length + 1,
    title,
    description,
    createdAt: new Date().toISOString(),
  };
  logs.push(log);
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

  if (index === -1) {
    return false;
  }

  logs.splice(index, 1);
  return true;
}

// ---- TEST RUN ----
console.log("\n--- ADD ---");
console.log(addLog("Start", "First CoreLog entry"));
console.log(addLog("Progress", "Added CRUD functions"));

console.log("\n--- GET ALL ---");
console.log(getAllLogs());

console.log("\n--- GET BY ID (1) ---");
console.log(getLogById(1));

console.log("\n--- GET BY ID (999) ---");
console.log(getLogById(999));

console.log("\n--- DELETE (1) ---");
console.log(deleteLog(1));

console.log("\n--- FINAL LOGS ---");
console.log(getAllLogs());
