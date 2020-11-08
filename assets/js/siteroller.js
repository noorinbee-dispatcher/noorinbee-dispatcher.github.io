
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
    rh = right.getBoundingClientRect()['top'];
    var left = document.getElementById('root');
    lh = left.getBoundingClientRect()['bottom'];
    if ((lh < 400) && (rh < lh)) {
        if (troveDecalsCursor < troveDecals.length) {
            var pad = document.createElement("div");
            var pic = document.createElement("img");
            var lnk = document.createElement("a");
            lnk.setAttribute("target", "_blank");
            lnk.setAttribute("href", troveDecals[troveDecalsCursor]['link']);
            thumb = sslify(troveDecals[troveDecalsCursor]['thumb']);
            pic.setAttribute("src", thumb );
            // pic.setAttribute("style", 'margin: auto; display: block; max-height:220px;min-height:120px;border: 2px solid grey;padding:5px;');
            pic.setAttribute("class", 'pad-pic');
            // pad.setAttribute("style", 'padding: 60px; margin:10px;max-width:85%');
            pad.setAttribute("class", 'main-pad');
            left.appendChild(pad);
            pad.appendChild(lnk);
            lnk.appendChild(pic);
            troveDecalsCursor++;
        }
    }
};