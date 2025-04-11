function hideElementsIfEnabled() {
  chrome.storage.sync.get(["enabled"], (result) => {
    if (result.enabled === false) return; // Exit if turned off

    // Sidebar (related videos)
    const related = document.getElementById("related");
    if (related) related.style.display = "none";

    // Comments
    const comments = document.getElementById("comments");
    if (comments) comments.style.display = "none";

    // Homepage feed
    const sections = document.querySelectorAll('ytd-rich-grid-renderer, ytd-browse');
    sections.forEach(section => section.style.display = 'none');

    // Shorts shelf
    const shorts = document.querySelectorAll('ytd-reel-shelf-renderer');
    shorts.forEach(short => short.style.display = 'none');

    // Playlist panel (usually shown on the right side in playlists)
    const playlist = document.querySelector("ytd-playlist-panel-renderer");
    if (playlist) playlist.style.display = "none";
  });
}

const observer = new MutationObserver(hideElementsIfEnabled);
observer.observe(document.body, { childList: true, subtree: true });

hideElementsIfEnabled(); // Call once immediately
