const { addLog, getAllLogs, getLogById, deleteLog } = require("./logs");

console.log("\n--- ADD ---");
console.log(addLog("Start", "Now using file persistence"));
console.log(addLog("Progress", "Split code into modules"));

console.log("\n--- GET ALL ---");
console.log(getAllLogs());

console.log("\n--- GET BY ID (1) ---");
console.log(getLogById(1));

console.log("\n--- DELETE (1) ---");
console.log(deleteLog(1));

console.log("\n--- FINAL LOGS ---");
console.log(getAllLogs());
