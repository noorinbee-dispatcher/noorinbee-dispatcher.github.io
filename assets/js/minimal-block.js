// build stage


var _globalHTTPS = "https://yacdn.org/proxy/";
var _globalTrap = false;

function sslify(url) {
    if (url.substr(0, 5) !== "https") {
        url = _globalHTTPS + url;
    }
    return url;
}

function fetcherise(url, headers, thendo) {
    console.log("Fetcherising:" + url);
    fetch(url, headers)
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(function (response) {
            thendo(response)
        }).catch(function (error) {
            console.log("Fetcherised unhappy result!");
            console.log(error);
            if (_globalTrap) {
                window.location.href = "/trap";
            }
        });
}