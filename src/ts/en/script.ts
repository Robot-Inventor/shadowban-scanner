import Swal from "sweetalert2";

/*
 * If the user came from a different website or directly accessed, and their browser language is Japanese,
 * redirect them to the Japanese version.
 */
if (
    (!document.referrer || new URL(document.referrer).hostname !== location.hostname) &&
    navigator.language.toLowerCase().startsWith("ja")
) {
    location.href = "/";
}

const buttons = document.querySelectorAll("button.download_button");

// eslint-disable-next-line max-statements
buttons.forEach((button) => {
    const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
    const isEdge = navigator.userAgent.toLowerCase().includes("edg");

    let downloadLink = "https://chrome.google.com/webstore/detail/enlganfikppbjhabhkkilafmkhifadjd/";
    let downloadText = "Install to Chrome";

    if (isFirefox) {
        downloadLink = "https://addons.mozilla.org/firefox/addon/shadowban-scanner/";
        downloadText = "Install to Firefox";
    } else if (isEdge) {
        downloadLink =
            "https://microsoftedge.microsoft.com/addons/detail/shadowban-scanner/kfeecmboomhggeeceipnbbdjmhjoccbl";
        downloadText = "Install to Edge";
    }

    button.textContent = downloadText;

    button.addEventListener("click", () => {
        const isMobile = Boolean(navigator.userAgent.match(/iPhone|Android.+Mobile/u));
        if (isMobile && !isFirefox) {
            void Swal.fire({
                background: "#21272e",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancel",
                color: "#fff",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Continue anyway",
                icon: "warning",
                showCancelButton: true,
                // eslint-disable-next-line max-len
                text: "Due to technical reasons, Shadowban Scanner is only available for PC browsers and Firefox for Android.",
                title: "Smartphones are not supported"
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
