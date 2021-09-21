const form = document.getElementById("stripe-login");
const fileInput = document.getElementById("file-upload");

fileInput.addEventListener("change", () => {
    form.submit();
});

window.addEventListener("paste", e => {
    fileInput.files = e.clipboardData.files;
});