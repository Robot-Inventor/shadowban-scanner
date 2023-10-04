const buttons = document.querySelectorAll("button.download_button");

buttons.forEach((button) => {
    const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
    const isEdge = navigator.userAgent.toLowerCase().includes("edg");

    let download_link = "https://chrome.google.com/webstore/detail/enlganfikppbjhabhkkilafmkhifadjd/";
    let download_text = "Install to Chrome";

    if (isFirefox) {
        download_link = "https://addons.mozilla.org/firefox/addon/shadowban-scanner/";
        download_text = "Install to Firefox";
    } else if (isEdge) {
        download_link = "https://microsoftedge.microsoft.com/addons/detail/shadowban-scanner/kfeecmboomhggeeceipnbbdjmhjoccbl";
        download_text = "Install to Edge";
    }

    button.textContent = download_text;

    button.addEventListener("click", () => {
        const isMobile = Boolean(navigator.userAgent.match(/iPhone|Android.+Mobile/))
        if (isMobile) {
            Swal.fire({
                title: "Smartphones are not supported",
                text: "Due to technical reasons, Shadowban Scanner is only available for PC browsers and Firefox Nightly for Android.",
                icon: "warning",
                showCancelButton: true,
                background: "#21272e",
                color: "#fff",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Continue anyway",
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                    open(download_link, "_blank");
                }
            })
        } else {
            open(download_link, "_blank");
        }
    });
});
