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
    li.style.display = "flex";
    li.style.gap = "10px";
    li.style.alignItems = "center";

    const text = document.createElement("span");
    text.className = "log-text";
    text.textContent = `${log.title} — ${log.description}`;


    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", async (e) => {
      e.stopPropagation();

      const newTitle = prompt("Edit title:", log.title);
      if (newTitle === null) return; // user cancelled

      const newDesc = prompt("Edit description:", log.description);
      if (newDesc === null) return;

      const title = newTitle.trim();
      const description = newDesc.trim();

      if (!title || !description) {
        console.error("Title and description cannot be empty");
        return;
      }

      const res = await fetch(`/logs/${log.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("PUT /logs failed:", res.status, text);
        return;
      }

      await refreshLogs();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";

    delBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      await fetch(`/logs/${log.id}`, { method: "DELETE" });
      await refreshLogs();
    });

    li.appendChild(text);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

addBtn.addEventListener("click", async () => {
  const title = input.value.trim();
const description = descInput.value.trim();

  if (title === "" || description === "") return;

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








