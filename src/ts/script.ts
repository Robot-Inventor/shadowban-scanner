import Swal from "sweetalert2";

/*
 * If the user came from a different website or directly accessed, and their browser language is not Japanese,
 * redirect them to the English version.
 */
if (
    (!document.referrer || new URL(document.referrer).hostname !== location.hostname) &&
    !navigator.language.toLowerCase().startsWith("ja")
) {
    location.href = "/en/";
}

const buttons = document.querySelectorAll("button.download_button");

// eslint-disable-next-line max-statements
buttons.forEach((button) => {
    const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
    const isEdge = navigator.userAgent.toLowerCase().includes("edg");

    let downloadLink = "https://chrome.google.com/webstore/detail/enlganfikppbjhabhkkilafmkhifadjd/";
    let downloadText = "Chromeにインストール";

    if (isFirefox) {
        downloadLink = "https://addons.mozilla.org/firefox/addon/shadowban-scanner/";
        downloadText = "Firefoxにインストール";
    } else if (isEdge) {
        downloadLink =
            "https://microsoftedge.microsoft.com/addons/detail/shadowban-scanner/kfeecmboomhggeeceipnbbdjmhjoccbl";
        downloadText = "Edgeにインストール";
    }

    button.textContent = downloadText;

    button.addEventListener("click", () => {
        const isMobile = Boolean(navigator.userAgent.match(/iPhone|Android.+Mobile/u));
        if (isMobile && !isFirefox) {
            void Swal.fire({
                background: "#21272e",
                cancelButtonColor: "#d33",
                cancelButtonText: "キャンセル",
                color: "#fff",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "とにかく続行する",
                icon: "warning",
                showCancelButton: true,
                text: "Shadowban Scannerは技術的な理由により、PCのブラウザーとAndroid版Firefoxでのみ利用できます。",
                title: "スマートフォンには対応していません"
            }).then((result) => {
                if (result.isConfirmed) {
                    open(downloadLink, "_blank");
                }
            });
        } else {
            open(downloadLink, "_blank");
        }
    });
});
