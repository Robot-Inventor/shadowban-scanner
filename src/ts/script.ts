import Swal from "sweetalert2";

// If the user came from a different website or directly accessed, and their browser language is not Japanese,
// redirect them to the English version.
if (
    (!document.referrer || new URL(document.referrer).hostname !== location.hostname) &&
    !navigator.language.toLowerCase().startsWith("ja")
) {
    location.href = "/en/";
}

const buttons = document.querySelectorAll("button.download_button");

buttons.forEach((button) => {
    const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
    const isEdge = navigator.userAgent.toLowerCase().includes("edg");

    let download_link = "https://chrome.google.com/webstore/detail/enlganfikppbjhabhkkilafmkhifadjd/";
    let download_text = "Chromeにインストール";

    if (isFirefox) {
        download_link = "https://addons.mozilla.org/firefox/addon/shadowban-scanner/";
        download_text = "Firefoxにインストール";
    } else if (isEdge) {
        download_link =
            "https://microsoftedge.microsoft.com/addons/detail/shadowban-scanner/kfeecmboomhggeeceipnbbdjmhjoccbl";
        download_text = "Edgeにインストール";
    }

    button.textContent = download_text;

    button.addEventListener("click", () => {
        const isMobile = Boolean(navigator.userAgent.match(/iPhone|Android.+Mobile/));
        if (isMobile && !isFirefox) {
            Swal.fire({
                title: "スマートフォンには対応していません",
                text: "Shadowban Scannerは技術的な理由により、PCのブラウザーとAndroid版Firefoxでのみ利用できます。",
                icon: "warning",
                showCancelButton: true,
                background: "#21272e",
                color: "#fff",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "とにかく続行する",
                cancelButtonText: "キャンセル"
            }).then((result) => {
                if (result.isConfirmed) {
                    open(download_link, "_blank");
                }
            });
        } else {
            open(download_link, "_blank");
        }
    });
});
