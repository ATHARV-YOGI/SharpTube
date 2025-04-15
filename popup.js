const focusOnBtn = document.getElementById("focus-on");
const focusOffBtn = document.getElementById("focus-off");

// Update button styles
function updateButtons(isEnabled) {
  if (isEnabled) {
    focusOnBtn.classList.add("selected");
    focusOffBtn.classList.remove("selected");
  } else {
    focusOnBtn.classList.remove("selected");
    focusOffBtn.classList.add("selected");
  }
}

// Initial load: set state from storage
chrome.storage.sync.get(["enabled"], (data) => {
  const isEnabled = data.enabled !== false;
  updateButtons(isEnabled);
});

// Toggle ON
focusOnBtn.addEventListener("click", () => {
  chrome.storage.sync.set({ enabled: true }, () => {
    updateButtons(true);
    reloadActiveTab();
  });
});

// Toggle OFF
focusOffBtn.addEventListener("click", () => {
  chrome.storage.sync.set({ enabled: false }, () => {
    updateButtons(false);
    reloadActiveTab();
  });
});



// Random quote logic
const quotes = [
  "Discipline is doing what needs to be done, even if you don't want to.",
  "Stay focused. Stay sharp. The grind is the glory.",
  "You don't need more time, you just need more focus.",
  "One task at a time. That's how you win.",
  "Focus like a laser, not like a flashlight.",
  "No distractions, only progress.",
  "Distraction has cost. Focus has value."
];

const quoteEl = document.getElementById("quote");
if (quoteEl) {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteEl.textContent = `"${quotes[randomIndex]}"`;
}
