window.onload = function () {
    var currentUrl = document.URL;
    var urlParts = currentUrl.split('#');

    if (urlParts.length > 1) {
        var anch = urlParts[1];
        document.getElementById(anch).click();
        window.scrollTo(0, 0);
    }

    if (
        typeof pageLaunch === "function"
    ) {
        console.log("Page scripts commence.")
        pageLaunch();
    }
}