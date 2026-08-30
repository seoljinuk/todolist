const STORAGE_KEY = "todolist-items";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const countLabel = document.getElementById("todo-count");
const clearCompletedBtn = document.getElementById("clear-completed");
const exportFileBtn = document.getElementById("export-file");
const emptyMessage = document.getElementById("empty-message");

let todos = loadTodos();
let editingId = null;

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");
    li.dataset.id = todo.id;

    if (todo.id === editingId) {
      li.appendChild(buildEditView(todo));
    } else {
      li.appendChild(buildViewMode(todo));
    }

    list.appendChild(li);
  });

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  countLabel.textContent = `전체 ${total}개 · 완료 ${completed}개`;

  emptyMessage.hidden = total !== 0;
}

function buildViewMode(todo) {
  const fragment = document.createDocumentFragment();

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => toggleComplete(todo.id));

  const text = document.createElement("span");
  text.className = "todo-text";
  text.textContent = todo.text;
  text.addEventListener("dblclick", () => startEdit(todo.id));

  const buttons = document.createElement("div");
  buttons.className = "todo-item-buttons";

  const editBtn = document.createElement("button");
  editBtn.textContent = "수정";
  editBtn.addEventListener("click", () => startEdit(todo.id));

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "삭제";
  deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

  buttons.append(editBtn, deleteBtn);
  fragment.append(checkbox, text, buttons);
  return fragment;
}

function buildEditView(todo) {
  const fragment = document.createDocumentFragment();

  const textarea = document.createElement("textarea");
  textarea.className = "todo-edit-textarea";
  textarea.value = todo.text;
  textarea.rows = Math.max(2, todo.text.split("\n").length);

  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      saveEdit(todo.id, textarea.value);
    }
    if (e.key === "Escape") {
      cancelEdit();
    }
  });

  const buttons = document.createElement("div");
  buttons.className = "todo-item-buttons";

  const saveBtn = document.createElement("button");
  saveBtn.className = "save-btn";
  saveBtn.textContent = "저장";
  saveBtn.addEventListener("click", () => saveEdit(todo.id, textarea.value));

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "cancel-btn";
  cancelBtn.textContent = "취소";
  cancelBtn.addEventListener("click", () => cancelEdit());

  buttons.append(saveBtn, cancelBtn);
  fragment.append(textarea, buttons);

  queueMicrotask(() => {
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  });

  return fragment;
}

function addTodo(text) {
  todos.push({
    id: Date.now().toString(),
    text,
    completed: false,
  });
  saveTodos();
  render();
}

function toggleComplete(id) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;
  todo.completed = !todo.completed;
  saveTodos();
  render();
}

function deleteTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;
  const confirmed = window.confirm(`"${todo.text}" 항목을 삭제하시겠습니까?`);
  if (!confirmed) return;
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  render();
}

function startEdit(id) {
  editingId = id;
  render();
}

function saveEdit(id, value) {
  const trimmed = value.trim();
  if (trimmed) {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      todo.text = trimmed;
      saveTodos();
    }
  }
  editingId = null;
  render();
}

function cancelEdit() {
  editingId = null;
  render();
}

function clearCompleted() {
  const completedCount = todos.filter((t) => t.completed).length;
  if (completedCount === 0) return;
  const confirmed = window.confirm(`완료된 항목 ${completedCount}개를 삭제하시겠습니까?`);
  if (!confirmed) return;
  todos = todos.filter((t) => !t.completed);
  saveTodos();
  render();
}

function exportToFile() {
  const payload = {
    exportedAt: new Date().toISOString(),
    todos,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-");

  const link = document.createElement("a");
  link.href = url;
  link.download = `todolist-export-${timestamp}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  addTodo(value);
  input.value = "";
  input.focus();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    form.requestSubmit();
  }
});

clearCompletedBtn.addEventListener("click", clearCompleted);
exportFileBtn.addEventListener("click", exportToFile);

render();
