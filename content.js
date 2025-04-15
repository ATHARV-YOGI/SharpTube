function updateElementsVisibility(enabled) {
  // Related videos
  const related = document.getElementById("related");
  if (related) related.style.display = enabled ? "none" : "";

  // Comments
  const comments = document.getElementById("comments");
  if (comments) comments.style.display = enabled ? "none" : "";

  // Homepage feed
  const sections = document.querySelectorAll('ytd-rich-grid-renderer, ytd-browse');
  sections.forEach(section => section.style.display = enabled ? "none" : "");

  // Shorts shelf
  const shorts = document.querySelectorAll('ytd-reel-shelf-renderer');
  shorts.forEach(short => short.style.display = enabled ? "none" : "");

  // Playlist panel
  const playlist = document.querySelector("ytd-playlist-panel-renderer");
  if (playlist) playlist.style.display = enabled ? "none" : "";
}

function checkAndApplySettings() {
  chrome.storage.sync.get(["enabled"], (result) => {
    const isEnabled = result.enabled !== false;
    updateElementsVisibility(isEnabled);
  });
}

// Observe dynamic changes (e.g., new video loads)
const observer = new MutationObserver(checkAndApplySettings);
observer.observe(document.body, { childList: true, subtree: true });

// Initial run
checkAndApplySettings();
