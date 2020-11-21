

var target = document.querySelectorAll("#overlayCell")[0];
var ext = "http://www.bom.gov.au/products/IDR682.loop.shtml";
var urlStub = "http://www.bom.gov.au";
var wholeBlock = ''
    + '<img style = "z-index:99; max-width:80%; height:auto; border:0; position:absolute;" id="animation"  alt="Finding Radar images" >'

    + '<img style = "z-index:55; max-width:80%; height:auto; position:absolute;" src="'
    + urlStub + '/products/radar_transparencies/IDR.legend.0.png'
    + '">'
    + '<img style = "z-index:1; max-width:80%;  position:absolute; border:0;" src="'
    + urlStub + '/products/radar_transparencies/IDR682.background.png'
    + '">'
    + '<img style = "z-index:2; max-width:80%;  position:absolute; border:0;" src="'
    + urlStub + '/products/radar_transparencies/IDR682.topography.png'
    + '">'
    + '<img style = "z-index:3; max-width:80%;  position:absolute; border:0;" src="'
    + urlStub + '/products/radar_transparencies/IDR682.locations.png'
    + '">'
    + '<img style = "z-index:4; max-width:80%;  position:absolute; border:0;" src="'
    + urlStub + '/products/radar_transparencies/IDR682.range.png'
    + '">';

target.innerHTML = wholeBlock;
var panel = document.querySelectorAll("#animation")[0];

var now = new Date();
var radarImages = [];
bomCrawl(now, 8);
bomFlip(0);

function bomFlip(i) {
    //console.log(radarImages.length +" : "+ i);
    if (radarImages.length > 0) {
        panel.setAttribute("src", radarImages[i]);
        i++;
    }
    if (i >= radarImages.length) {
        i = 0;
    }
    setTimeout(function () { bomFlip(i) }, 525);
}

function bomCrawl(timeSet, bailOut) {
    bailOut--;
    if (bailOut == 0) { return; }
    var checking = new Date(timeSet);
    alt = "IDR682.T." + checking.toISOString().replace(/[^0-9]/g, "").slice(0, -5) + ".png";
    //console.log(alt);
    url = _globalHTTPS + urlStub + "/radar/" + alt;
    fetch(url).then(function (response) {
        if (response["status"] != 200) {
            throw 'NoFileAtTime!';
        }
        //console.log(response["url"]);
        radarImages.unshift(response["url"]);
        if (radarImages.length == 1) {
            panel.setAttribute("src", response["url"]);
        }
        var dd = checking.setMinutes(checking.getMinutes() - 5);
        bomCrawl(dd, 2);
    }).catch(function () {

        var dd = checking.setMinutes(checking.getMinutes() - 1);
        bomCrawl(dd, bailOut);
    });

}
