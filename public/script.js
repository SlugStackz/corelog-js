window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("logInput");
  const addBtn = document.getElementById("addBtn");
  const list = document.getElementById("logList");
  const descInput = document.getElementById("descInput");
  const changeBtn = document.getElementById("changeBtn");
const resetBtn = document.getElementById("resetBtn");
const mainTitle = document.getElementById("mainTitle");

changeBtn.addEventListener("click", () => {
  mainTitle.textContent = "Button Clicked ✅";
});

resetBtn.addEventListener("click", () => {
  mainTitle.textContent = "Zach's First Frontend Page";
});



  // Load logs from backend and render
  async function refreshLogs() {
    const res = await fetch("/logs");
    const logs = await res.json();
    renderLogs(logs);
  }

  function renderLogs(logs) {
    list.innerHTML = "";

    logs.forEach((log) => {
      const li = document.createElement("li");
      li.style.cursor = "pointer";
      li.textContent = `${log.title} — ${log.description}`;

      li.addEventListener("click", async () => {
        await fetch(`/logs/${log.id}`, { method: "DELETE" });
        await refreshLogs();
      });

      list.appendChild(li);
    });
  }

addBtn.addEventListener("click", async () => {
  const title = input.value.trim();
const description = descInput.value.trim();

  if (title === "") return;

  try {
    const res = await fetch("/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),

    });

    if (!res.ok) {
      const text = await res.text();
      console.error("POST /logs failed:", res.status, text);
      return; // <-- don't clear input if it failed
    }

    input.value = "";
    descInput.value = "";
    input.focus();

    await refreshLogs();
  } catch (err) {
    console.error("Network error posting log:", err);
  }
});

function handleEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addBtn.click();
  }
}

input.addEventListener("keydown", handleEnter);
descInput.addEventListener("keydown", handleEnter);

// Initial load
refreshLogs();
});








