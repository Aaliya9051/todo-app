let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 🔄 Render Tasks
function renderTasks(filter = "all") {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (filter === "completed" && !task.done) return;
    if (filter === "pending" && task.done) return;

    let li = document.createElement("li");

    // LEFT SIDE (icon + text)
    let leftDiv = document.createElement("div");
    leftDiv.className = "task-left";

    // ✅ ICON INSTEAD OF CHECKBOX
    let icon = document.createElement("span");
    icon.innerText = task.done ? "✔" : "○";
    icon.className = "task-icon";

    icon.onclick = () => {
      tasks[index].done = !tasks[index].done;
      renderTasks();
    };

    // TASK TEXT
    let span = document.createElement("span");
    span.innerText = task.text;

    if (task.done) span.classList.add("completed");

    // DELETE BUTTON
    let delBtn = document.createElement("button");
    delBtn.innerText = "🗑";

    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    // APPEND
    leftDiv.appendChild(icon);
    leftDiv.appendChild(span);

    li.appendChild(leftDiv);
    li.appendChild(delBtn);

    list.appendChild(li);
  });

  // SAVE
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // COUNT
  let completed = tasks.filter(t => t.done).length;
  let total = tasks.length;

  document.getElementById("taskCount").innerText =
    `Total: ${total} | Completed: ${completed}`;

  // PROGRESS
  updateProgressBar(total, completed);
}

// 📈 Progress Bar
function updateProgressBar(total, completed) {
  let percent = total === 0 ? 0 : (completed / total) * 100;

  let bar = document.getElementById("progressBar");
  bar.style.width = percent + "%";
  bar.innerText = Math.round(percent) + "%";
}

// ➕ Add Task
function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value.trim();

  if (text === "") return;

  tasks.push({ text: text, done: false });
  input.value = "";

  showSuggestion(text);
  renderTasks();
}

// ❌ Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// 🔍 Filter Tasks
function filterTasks(type) {
  renderTasks(type);
}

// 🤖 Suggestion
function showSuggestion(task) {
  let suggestion = document.getElementById("suggestion");

  if (task.toLowerCase().includes("study")) {
    suggestion.innerText = "AI Tip: Break study into 25 min sessions ⏱";
  } else if (task.toLowerCase().includes("project")) {
    suggestion.innerText = "AI Tip: Start small and build momentum 🚀";
  } else if (task.toLowerCase().includes("urgent")) {
    suggestion.innerText = "AI Tip: Do this task immediately ⚡";
  } else {
    suggestion.innerText = "AI Tip: Stay consistent 💡";
  }
}

// 🌙 Dark Mode
let toggleBtn = document.getElementById("darkToggle");

if (toggleBtn) {
  toggleBtn.onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  };
}

// ⌨ Enter Key
document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

// 🚀 Load
window.onload = () => {
  renderTasks();

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
};