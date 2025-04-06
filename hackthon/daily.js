const noteBoard = document.getElementById("note-board");
const addNoteBtn = document.getElementById("add-note-btn");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");

const noteColors = ['#ffd166', '#06d6a0', '#ef476f', '#8338ec', '#118ab2'];
let notes = [
  {
    id: 1,
    text: "🧠 Study DSA: Arrays & Trees",
    color: noteColors[0],
    rotate: "1.5deg",
    done: true,
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: 2,
    text: "🏃 Workout - Cardio 30 mins",
    color: noteColors[1],
    rotate: "-2deg",
    done: false,
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: 3,
    text: "🛒 Grocery List: Milk, Eggs, Bread",
    color: noteColors[2],
    rotate: "2deg",
    done: false,
    date: new Date().toISOString().split("T")[0],
  },
];

addNoteBtn.addEventListener("click", () => {
  document.getElementById("note-input").value = "";
  document.getElementById("note-date-input").value = "";
  document.getElementById("add-note-modal").style.display = "block";
});

function saveNote() {
  const text = document.getElementById("note-input").value.trim();
  const date = document.getElementById("note-date-input").value;

  if (!text || !date) {
    alert("Please enter note content and a date.");
    return;
  }

  const color = noteColors[Math.floor(Math.random() * noteColors.length)];
  const rotate = (Math.random() * 4 - 2).toFixed(2) + "deg";

  const note = {
    id: Date.now(),
    text,
    color,
    rotate,
    done: false,
    date,
  };

  notes.push(note);
  closeModal("add-note-modal");
  renderNotes();
}

function renderNotes(dateFilter = null) {
  noteBoard.innerHTML = "";
  const filtered = dateFilter ? notes.filter(n => n.date === dateFilter) : notes;
  filtered.forEach(note => {
    const noteEl = document.createElement("div");
    noteEl.className = "sticky-note";
    noteEl.style.setProperty("--color", note.color);
    noteEl.style.setProperty("--rotate", note.rotate);
    noteEl.innerHTML = `
      <p>${note.text}</p>
      <button onclick="toggleDone(${note.id})">✔️</button>
      <button onclick="deleteNote(${note.id})">🗑️</button>
    `;
    noteBoard.appendChild(noteEl);
  });
  updateProgress();
}

function toggleDone(id) {
  const note = notes.find(n => n.id === id);
  if (note) note.done = !note.done;
  renderNotes();
}

function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  renderNotes();
}

function updateProgress() {
  const total = notes.length;
  const done = notes.filter(n => n.done).length;
  const percent = total ? (done / total) * 100 : 0;
  progressFill.style.width = `${percent}%`;
  progressText.textContent = `${done} of ${total} completed (${Math.round(percent)}%)`;
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

document.getElementById("settings-btn").onclick = () => {
  document.getElementById("settings-modal").style.display = "block";
};

document.getElementById("theme-select").onchange = (e) => {
  const root = document.documentElement;
  const body = document.body;
  const theme = e.target.value;

  body.classList.remove("cyberpunk");

  switch (theme) {
    case "dark":
      root.style.setProperty("--bg", "#1e1e1e");
      root.style.setProperty("--text", "#ffffff");
      break;
    case "pastel":
      root.style.setProperty("--bg", "#faf4ef");
      root.style.setProperty("--text", "#2d2d2d");
      break;
    case "cyberpunk":
      body.classList.add("cyberpunk");
      break;
    default:
      root.style.setProperty("--bg", "#f4f7fc");
      root.style.setProperty("--text", "#000000");
  }
};

document.getElementById("calendar-btn").onclick = () => {
  document.getElementById("calendar-modal").style.display = "block";
};

function filterByDate() {
  const selectedDate = document.getElementById("note-date").value;
  if (selectedDate) {
    renderNotes(selectedDate);
    closeModal("calendar-modal");
  }
}

renderNotes();
