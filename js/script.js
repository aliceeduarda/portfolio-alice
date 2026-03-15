function playVideo() {
    const driveVideoId = "1hqbZsOLhdaBrUaCUJ08adMTd74jWpS3_";

    document.querySelector(".video-box").innerHTML = `
        <iframe
            src="https://drive.google.com/file/d/${driveVideoId}/preview"
            width="100%"
            height="100%"
            allow="autoplay">
        </iframe>
    `;
}
