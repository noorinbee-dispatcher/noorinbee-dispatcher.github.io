

var target;
// var ext = "http://www.bom.gov.au/products/IDR682.loop.shtml";
var urlStub = "http://www.bom.gov.au";
var panel;

var now = new Date();
var radarImages = [];
var carryOver;

function pageLaunch() {

    baseMaps();
    bomCrawl(now, 8);
    bomFlip(0);
}

function baseMaps() {
    var wholeBlock = ''
        + '<img style = "z-index:10; max-width:80%; height:auto; border:0; position:absolute;" id="animation"  alt="Finding Radar images" >'

        + '<img style = "z-index:55; max-width:80%; height:auto; position:absolute;" src="'
        + sslify(urlStub + '/products/radar_transparencies/IDR.legend.0.png')
        + '">'
        + '<img style = "z-index:1; max-width:80%;  position:absolute; border:0;" src="'
        + sslify(urlStub + '/products/radar_transparencies/IDR682.background.png')
        + '">'
        + '<img style = "z-index:2; max-width:80%;  position:absolute; border:0;" src="'
        + sslify(urlStub + '/products/radar_transparencies/IDR682.topography.png')
        + '">'
        + '<img style = "z-index:11; max-width:80%;  position:absolute; border:0;" src="'
        + sslify(urlStub + '/products/radar_transparencies/IDR682.locations.png')
        + '">'
        + '<img style = "z-index:12; max-width:80%;  position:absolute; border:0;" src="'
        + sslify(urlStub + '/products/radar_transparencies/IDR682.range.png')
        + '">';

    target = document.querySelectorAll("#overlayCell")[0];
    target.innerHTML = wholeBlock;
    panel = document.querySelectorAll("#animation")[0];
}


function bomFlip(i) {
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
    var recurse = bailOut - 1;
    if (recurse == 0) { return; }
    var checking = new Date(timeSet);
    alt = "IDR682.T." + checking.toISOString().replace(/[^0-9]/g, "").slice(0, -5) + ".png";
    unq = "#" + uniquify();
    url = sslify(urlStub + "/radar/" + alt + unq);
    fetch(url).then(function (response) {
        if (response["status"] != 200) {
            throw 'NoFileCanRead!';
        }
        carryOver = response["url"];
        response.blob().then(function (dat) {
            if (dat.size == 0) {
                throw 'NoFileAtTime!';
            }
            radarImages.unshift(carryOver);
            if (radarImages.length == 1) {
                panel.setAttribute("src", carryOver);
            }
            var dd = checking.setMinutes(checking.getMinutes() - 5);
            setTimeout(function () { bomCrawl(dd, 2); }, 200);
        }).catch(function () {
            var dd = checking.setMinutes(checking.getMinutes() - 1);
            setTimeout(function () { bomCrawl(dd, recurse); }, 500);
        });
    }).catch(function () {
        return;
    });

}
