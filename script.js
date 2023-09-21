const buttons = document.querySelectorAll("button.download_button");

buttons.forEach((button) => {
    const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
    const isEdge = navigator.userAgent.toLowerCase().includes("edg");

    let download_link = "https://chrome.google.com/webstore/detail/enlganfikppbjhabhkkilafmkhifadjd/";
    let download_text = "Chromeにダウンロード";

    if (isFirefox) {
        download_link = "https://addons.mozilla.org/firefox/addon/shadowban-scanner/";
        download_text = "Firefoxにダウンロード";
    } else if (isEdge) {
        download_link = "https://microsoftedge.microsoft.com/addons/detail/shadowban-scanner/kfeecmboomhggeeceipnbbdjmhjoccbl";
        download_text = "Edgeにダウンロード";
    }

    button.textContent = download_text;

    button.addEventListener("click", () => {
        open(download_link, "_blank");
    });
});
