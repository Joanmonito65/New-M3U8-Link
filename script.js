function createNewLink() {
    const originalUrl = document.getElementById('originalUrl').value.trim();
    
    if (!originalUrl) {
        alert('Please paste a valid link!');
        return;
    }

    try {
        // Create a standard M3U8 master playlist file layout using text
        const manifestContent = `#EXTM3U\n#EXT-X-STREAM-INF:BANDWIDTH=1280000\n${originalUrl}`;
        
        // Convert the text manifest directly into a virtual file stream link (Data URI)
        const encodedLink = `data:application/x-mpegURL;base64,${btoa(manifestContent)}`;
        
        // Unhide the result layout and push the new link inside
        document.getElementById('newUrlResult').value = encodedLink;
        document.getElementById('resultBox').classList.remove('hidden');
    } catch(error) {
        alert("Error generating link. Double-check your URL format.");
        console.error(error);
    }
}

function copyLink() {
    const copyText = document.getElementById('newUrlResult');
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(copyText.value)
        .then(() => alert('Copied your new raw stream link!'))
        .catch(() => alert('Failed to copy automatically. Please copy it manually.'));
}
