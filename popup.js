const toggleCheckbox = document.getElementById("toggle-extension");

chrome.storage.sync.get(["enabled"], (data) => {
  toggleCheckbox.checked = data.enabled !== false;
});

toggleCheckbox.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: toggleCheckbox.checked }, () => {
    reloadActiveTab();
  });
});

// Reload tab to re-run content script
function reloadActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.reload(tab.id);
  });
}

// Optional random quotes
const quotes = [
  "Discipline is doing what needs to be done, even if you don’t want to.",
  "Stay focused. Stay sharp. The grind is the glory.",
  "You don’t need more time, you just need more focus.",
  "One task at a time. That’s how you win.",
  "Focus like a laser, not like a flashlight.",
  "No distractions, only progress."
];

const quoteEl = document.getElementById("quote");
if (quoteEl) {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteEl.textContent = `"${quotes[randomIndex]}"`;
}
