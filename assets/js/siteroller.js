
var troveDecals = [];
var troveDecalsCursor = 0;

var troveBaseurl = 'https://api.trove.nla.gov.au/v2';
var troveBaseKey = '&key=8m38np2oj39vl4a6';

var pullingDecals = false;
var poppingDecals = 0;

var troveDecalsurl = troveBaseurl
    + '/result?' + troveBaseKey
    + '&q=';

function pagePlug() {
    for (var i = 0; i < siteCoverage.length; i++) {
        if (siteCoverage[i].trove) {
            troveDecalsurl = troveDecalsurl
                + ' fulltext:%22'
                + siteCoverage[i].name.replace(" ", "%20")
                + '%22~0 ';
            if (i < siteCoverage.length - 1) {
                troveDecalsurl = troveDecalsurl
                    + ' OR ';
            }
        }
    }

    troveDecalsurl = troveDecalsurl
        + '&zone=picture&reclevel=brief'
        + '&l-availability=y%2Ff&encoding=json'
        // + '&sortby=relevance';
        + '&sortby=dateasc';
        
    troveTime();
}

function troveTime() {
    troveRoll();
    setTimeout(function () {troveTime()},330);
}

function troveTrawl() {
    pullingDecals = true;
    fetch(troveDecalsurl).then(function (response) {
        response.json().then(function (trv) {
            rec = trv['response']['zone'][0]['records']['work'];
            troveDecalsurl = troveBaseurl
                + trv['response']['zone'][0]['records']['next']
                + troveBaseKey;
            pushDecals = troveDecals.length;
            for (i = 0; i < rec.length; i++) {
                if ((rec[i]['identifier'][1] !== undefined)
                    && (rec[i]['troveUrl'] !== undefined)) {
                    troveDecals[pushDecals] = [];
                    troveDecals[pushDecals]['thumb'] = rec[i]['identifier'][1]['value'];
                    troveDecals[pushDecals]['link'] = rec[i]['troveUrl'];
                    pushDecals++;
                }
            }
            pullingDecals = false;
        });
    });
}

function troveRoll(e) {
    if (pullingDecals || (poppingDecals > 1)) { return; }
    var right = document.getElementById('top');
    if (right.classList.contains('flip-wide')) {
        return;
    }
    var rht = right.getBoundingClientRect()['top'];
    var rhb = right.getBoundingClientRect()['bottom'];
    var left = document.getElementById('root');
    var lhb = left.getBoundingClientRect()['bottom'];
    if ((lhb < 520) && (rht < lhb) && (lhb < rhb)) {

        if (troveDecalsCursor == troveDecals.length) {
            troveTrawl();
        }
        
        if (troveDecalsCursor < troveDecals.length) {
            var pad = document.createElement("div");
            var pic = document.createElement("img");
            var lnk = document.createElement("a");
            lnk.setAttribute("target", "_blank");
            lnk.setAttribute("href", troveDecals[troveDecalsCursor]['link']);
            thumb = sslify(troveDecals[troveDecalsCursor]['thumb']);
            pic.setAttribute("alt", "DISCOVER ON TROVE");
            pic.setAttribute("src", thumb);
            pic.setAttribute("class", 'pad-pic');
            pad.setAttribute("class", 'main-pad');
            pad.setAttribute("style", 'display:none');
            pic.setAttribute("onload", 'poppingDecals--;this.parentNode.parentNode.setAttribute("style","display:block");');
            pic.setAttribute("onerror", 'poppingDecals--;');
            poppingDecals++;
            left.appendChild(pad);
            pad.appendChild(lnk);
            lnk.appendChild(pic);
            troveDecalsCursor++;
        }
    }
};