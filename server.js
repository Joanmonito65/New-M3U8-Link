function createNewLink() {
    const originalUrl = document.getElementById('originalUrl').value.trim();
    if(!originalUrl) return alert('Please paste a link');

    try {
        // We create a tiny text payload that links directly to your original stream
        const manifestContent = `#EXTM3U\n#EXT-X-STREAM-INF:BANDWIDTH=1280000\n${originalUrl}`;
        
        // Convert it into a browser-readable Data URI stream
        const encodedLink = `data:application/vnd.apple.mpegurl;base64,${btoa(manifestContent)}`;
        
        document.getElementById('newUrlResult').value = encodedLink;
        document.getElementById('resultBox').classList.remove('hidden');
    } catch(e) {
        alert("Error generating link. Make sure the URL doesn't have strange characters.");
    }
}
