function createNewLink() {
    const originalUrl = document.getElementById('originalUrl').value.trim();
    
    if (!originalUrl) {
        alert('Please paste a valid link!');
        return;
    }

    // We use a public, reverse-proxy service that strips restrictions and returns raw streaming files.
    // This creates a standard 'https://' link that Safari can actually read and stream.
    const proxyBase = "https://corsproxy.io/?url=";
    
    // Combine the proxy and your original link, ensuring special characters are safe
    const newCleanLink = proxyBase + encodeURIComponent(originalUrl);

    // Reveal the box and show the new link
    document.getElementById('newUrlResult').value = newCleanLink;
    document.getElementById('resultBox').classList.remove('hidden');
}

function copyLink() {
    const copyText = document.getElementById('newUrlResult');
    copyText.select();
    copyText.setSelectionRange(0, 99999); // Mobile compatibility

    navigator.clipboard.writeText(copyText.value)
        .then(() => alert('Copied your Safari-compatible stream link!'))
        .catch(() => alert('Failed to copy automatically. Please copy it manually.'));
}
