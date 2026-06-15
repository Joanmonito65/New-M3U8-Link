// Automatically check if someone opened a generated stream link
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const targetStream = urlParams.get('play');

    if (targetStream) {
        const streamUrl = decodeURIComponent(targetStream);
        activateSafariPlayer(streamUrl);
    }
});

function createNewLink() {
    const originalUrl = document.getElementById('originalUrl').value.trim();
    
    if (!originalUrl) {
        alert('Please paste a valid link!');
        return;
    }

    // Creates a beautiful, standard link pointing right back to your GitHub Page deployment
    const baseUrl = window.location.origin + window.location.pathname;
    const shareableUrl = `${baseUrl}?play=${encodeURIComponent(originalUrl)}`;

    document.getElementById('newUrlResult').value = shareableUrl;
    document.getElementById('resultBox').classList.remove('hidden');
}

function activateSafariPlayer(url) {
    const interfaceBox = document.getElementById('interfaceBox');
    const playerLayer = document.getElementById('playerLayer');
    const video = document.getElementById('safariVideo');

    // Wipe out the website interface and force fullscreen view
    interfaceBox.style.display = 'none';
    playerLayer.style.display = 'block';

    // Hook the stream up to Safari's native player engine
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
    } else {
        // Fallback or alert if tested on a browser without native HLS support
        alert("This player layout uses Safari's native streaming engine.");
    }
}

function copyLink() {
    const copyText = document.getElementById('newUrlResult');
    copyText.select();
    navigator.clipboard.writeText(copyText.value)
        .then(() => alert('Link copied! Paste this into a new Safari tab.'))
        .catch(() => alert('Failed to copy. Copy it manually from the box.'));
}
