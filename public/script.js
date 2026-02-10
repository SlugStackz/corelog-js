window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("logInput");
  const addBtn = document.getElementById("addBtn");
  const list = document.getElementById("logList");
  const descInput = document.getElementById("descInput");
  const changeBtn = document.getElementById("changeBtn");
  const resetBtn = document.getElementById("resetBtn");
  const mainTitle = document.getElementById("mainTitle");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  let allLogsCache = [];

changeBtn.addEventListener("click", () => {
  mainTitle.textContent = "Button Clicked ✅";
});

resetBtn.addEventListener("click", () => {
  mainTitle.textContent = "Zach's First Frontend Page";
});

function sortLogs(logs, mode) {
  const sorted = [...logs];

  if (mode === "newest") {
    sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  if (mode === "oldest") {
    sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  if (mode === "title") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  return sorted;
}

  // Load logs from backend and render
  async function refreshLogs() {
  const res = await fetch("/logs");
  allLogsCache = await res.json();

  const sorted = sortLogs(allLogsCache, sortSelect.value);
  renderLogs(sorted);
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

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();

  const filtered = allLogsCache.filter(log =>
    log.title.toLowerCase().includes(term) ||
    log.description.toLowerCase().includes(term)
  );

  renderLogs(filtered);
});

sortSelect.addEventListener("change", () => {
  const sorted = sortLogs(allLogsCache, sortSelect.value);
  renderLogs(sorted);
});


// Initial load
refreshLogs();
});








