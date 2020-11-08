// build stage


var _globalHTTPS = "https://yacdn.org/proxy/";

function sslify(url) {
    if (url.substr(0, 5) !== "https") {
        url = _globalHTTPS + url;
    }
    return url;
}