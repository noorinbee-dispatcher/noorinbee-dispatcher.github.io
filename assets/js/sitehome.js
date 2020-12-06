

var _globalHTTPS = "https://api.allorigins.win/raw?url=";
//"https://cors-anywhere.herokuapp.com/";
// https://api.allorigins.win/raw?url=
//"https://thingproxy.freeboard.io/fetch/"; 
//"https://yacdn.org/proxy/";

// if the proxy needs url encoded as param inclusion:
var _globalEncode = true;
// append #tag to urls as hint to proxy not to cache:
var _globalUnique = true;
// redirect request errors to a friendly 404/failure variant
var _globalTrap = false;

const siteCoverage = [
    { name: "Bellbird Creek", trove: true, state: "VIC", postcode: "3889", latlon: ["-37.636454280981", "148.81672190362"], },
    { name: "Bemm River", trove: true, state: "VIC", postcode: "3889", latlon: ["-37.7600836", "148.9682657"], },
    { name: "Cabbage Tree Creek", trove: false, state: "VIC", postcode: "3889", latlon: ["-37.656795696603", "148.71532645299"], },
    { name: "Club Terrace", trove: false, state: "VIC", postcode: "3889", latlon: ["-37.5548377", "148.9391246"], },
    { name: "Combienbar", trove: true, state: "VIC", postcode: "3889", latlon: ["-37.386375277319", "149.02103901007"], },
    { name: "Errinundra", trove: true, state: "VIC", postcode: "3889", latlon: ["-37.473677023497", "148.71628690573"], },
    { name: "Manorina", trove: false, state: "VIC", postcode: "3889", latlon: ["-37.690265551471", "148.79942825929"], },
    { name: "Buldah", trove: true, state: "VIC", postcode: "3890", latlon: ["-37.238400883518", "149.12406856715"], },
    { name: "Cann River", trove: true, state: "VIC", postcode: "3890", latlon: ["-37.5656808", "149.1499463"], },
    { name: "Chandlers Creek", trove: true, state: "VIC", postcode: "3890", latlon: ["-37.305477639208", "149.32177574455"], },
    { name: "Noorinbee", trove: true, state: "VIC", postcode: "3890", latlon: ["-37.508814728674", "149.21516802241"], },
    { name: "Noorinbee North", trove: true, state: "VIC", postcode: "3890", latlon: ["-37.445372576153", "149.28497762777"], },
    { name: "Tamboon", trove: true, state: "VIC", postcode: "3890", latlon: ["-37.6842624134", "149.18708749828"], },
    { name: "Tonghi Creek", trove: true, state: "VIC", postcode: "3890", latlon: ["-37.602140415157", "149.06242795726"], },
    { name: "Genoa", trove: false, state: "VIC", postcode: "3891", latlon: ["-37.47392", "149.5917737"], },
    { name: "Gipsy Point", trove: true, state: "VIC", postcode: "3891", latlon: ["-37.487151325819", "149.68996897769"], },
    { name: "Maramingo Creek", trove: true, state: "VIC", postcode: "3891", latlon: ["-37.396276303328", "149.61725248193"], },
    { name: "Wallagaraugh", trove: true, state: "VIC", postcode: "3891", latlon: ["-37.435656809253", "149.74486777235"], },
    { name: "Wangarabell", trove: true, state: "VIC", postcode: "3891", latlon: ["-37.39452731739", "149.48172340575"], },
    { name: "Wingan River", trove: true, state: "VIC", postcode: "3891", latlon: ["-37.629558659636", "149.52776555262"], },
    { name: "Wroxham", trove: true, state: "VIC", postcode: "3891", latlon: ["-37.33716517964", "149.49129850525"], },

];

window.onload = function () {
    var currentUrl = document.URL;
    var urlParts = currentUrl.split('#');

    if (urlParts.length > 1) {
        var anch = urlParts[1];
        var jump = (anch) ? document.getElementById(anch) : null;
        if (jump) {
            jump.click();
            window.scrollTo(0, 0);
        }

        if (urlParts[2] == "wide") {
            wideView();
        }
    }

    console.log("Dispatching from: ");
    console.log(siteCoverage);

    if (
        typeof pageLaunch === "function"
    ) {
        console.log("Page scripts commence.")
        pageLaunch();
    }

    if (
        typeof pagePlug === "function"
    ) {
        console.log("Support scripts commence.")
        pagePlug();
    }
}

function uniquify() {
return Math.random().toString(36).substr(2, 9);
}

function sslify(url) {
    if (url.substr(0, 5) !== "https") {  
        url = (_globalEncode)?encodeURIComponent(url):url; 
        url = _globalHTTPS + url;
    }
    return url;
}

function fetcherise(url, headers, thendo) {     
    var distinct = "#"+uniquify();
    distinct = (_globalEncode)?encodeURIComponent(distinct):distinct; 
    url = (_globalUnique)?url + distinct:url;
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
            console.log(":( Fetcherised unhappy result :(");
            console.log(error);
            if (_globalTrap) {
                window.location.href = "/trap";
            }
        });
}