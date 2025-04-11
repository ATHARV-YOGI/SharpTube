// Enable/Disable Extension toggle
const toggleCheckbox = document.getElementById("toggle-extension");

chrome.storage.sync.get(["enabled"], (data) => {
  toggleCheckbox.checked = data.enabled !== false; // default to true
});

toggleCheckbox.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: toggleCheckbox.checked }, () => {
    reloadActiveTab();
  });
});

// Toggle Playlist button
document.getElementById("toggle-playlist").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const playlist = document.querySelector("ytd-playlist-panel-renderer");
      if (playlist) {
        playlist.style.display = playlist.style.display === "none" ? "" : "none";
      }
    }
  });
});

// Reload tab to re-run content script on change
function reloadActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.reload(tab.id);
  });
}
