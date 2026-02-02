console.log("✅ Node is running index.js correctly");
// CoreLog v0 — first real program
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

addLog("Start", "First CoreLog entry");
addLog("Progress", "Node, Git, and PowerShell are working");

console.log(logs);
