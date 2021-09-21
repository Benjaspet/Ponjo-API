function extensionCheck(event) {
    if (!event || !event.target || !event.target.files || event.target.files.length === 0) return;
    const name = event.target.files[0].name;
    const lastDot = name.lastIndexOf(".");
    const fileName = name.substring(0, lastDot);
    const ext = name.substring(lastDot + 1);
    const extensions = ["png", "jpg", "svg"];
    if (!extensions.includes(ext)) {
        alert("That is not a valid image type. Only PNGs, JPEGs, and SVGs can be uploaded.");
        document.getElementById("file-upload").value = null;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}