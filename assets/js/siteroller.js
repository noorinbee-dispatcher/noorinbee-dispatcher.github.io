
var troveDecals = [];
var troveDecalsCursor = 0;

var troveBaseurl = 'https://api.trove.nla.gov.au/v2';
var troveBaseKey = '&key=8m38np2oj39vl4a6';

var pullingDecals = false;

var troveDecalsurl = troveBaseurl
    + '/result?' + troveBaseKey
    + '&q='
    + 'buldah OR combienbar OR '
    + ' noorinbee OR tamboon OR '
    + ' croajingolong OR coopracambra OR errinundra OR '
    + ' fulltext:%22bemm%20river%22~0 OR '
    + ' fulltext:%22cann%20river%22~0'
    + '&zone=picture&reclevel=brief'
    + '&l-availability=y%2Ff&encoding=json'
    + '&sortby=dateasc';

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

window.onscroll = function (e) {
    if (pullingDecals) { return; }
    if (troveDecalsCursor == troveDecals.length) {
        troveTrawl();
    }
    var right = document.getElementById('top');
    var rht = right.getBoundingClientRect()['top'];
    var rhb = right.getBoundingClientRect()['bottom'];
    var left = document.getElementById('root');
    var lhb = left.getBoundingClientRect()['bottom'];
    if ((lhb < 280) && (rht < lhb) && (lhb < rhb)) {
        if (troveDecalsCursor < troveDecals.length) {
            var pad = document.createElement("div");
            var pic = document.createElement("img");
            var lnk = document.createElement("a");
            lnk.setAttribute("target", "_blank");
            lnk.setAttribute("href", troveDecals[troveDecalsCursor]['link']);
            thumb = sslify(troveDecals[troveDecalsCursor]['thumb']);
            pic.setAttribute("alt", "DISCOVER ON TROVE");
            pic.setAttribute("src", thumb );
            pic.setAttribute("class", 'pad-pic');
            pad.setAttribute("class", 'main-pad');
            pad.setAttribute("style", 'display:none');
            pic.setAttribute("onload", 'this.parentNode.parentNode.setAttribute("style","display:block");');
            left.appendChild(pad);
            pad.appendChild(lnk);
            lnk.appendChild(pic);
            troveDecalsCursor++;
        }
    }
};