
// see: http://www.bom.gov.au/australia/meteye/search.php?q=
var regions = [];
regions.push(JSON.parse('{"object":"list","data":[{"object":"search_locations","hash":"M6YG","name":"Bellbird Creek","state":"VIC","postcode":"3889","latitude":-37.636454280981,"longitude":148.81672190362,"url":"\/vic\/bellbird-creek\/"},{"object":"search_locations","hash":"M6Z3","name":"Bemm River","state":"VIC","postcode":"3889","latitude":-37.7600836,"longitude":148.9682657,"url":"\/vic\/bemm-river\/"},{"object":"search_locations","hash":"M6Y7","name":"Cabbage Tree Creek","state":"VIC","postcode":"3889","latitude":-37.656795696603,"longitude":148.71532645299,"url":"\/vic\/cabbage-tree-creek\/"},{"object":"search_locations","hash":"M6ZM","name":"Club Terrace","state":"VIC","postcode":"3889","latitude":-37.5548377,"longitude":148.9391246,"url":"\/vic\/club-terrace\/"},{"object":"search_locations","hash":"M7P8","name":"Combienbar","state":"VIC","postcode":"3889","latitude":-37.386375277319,"longitude":149.02103901007,"url":"\/vic\/combienbar\/"},{"object":"search_locations","hash":"M6YR","name":"Errinundra","state":"VIC","postcode":"3889","latitude":-37.473677023497,"longitude":148.71628690573,"url":"\/vic\/errinundra\/"},{"object":"search_locations","hash":"M6YD","name":"Manorina","state":"VIC","postcode":"3889","latitude":-37.690265551471,"longitude":148.79942825929,"url":"\/vic\/manorina\/"}]} ')['data']);
regions.push(JSON.parse('{"object":"list","data":[{"object":"search_locations","hash":"ME05","name":"Buldah","state":"VIC","postcode":"3890","latitude":-37.238400883518,"longitude":149.12406856715,"url":"\/vic\/buldah\/"},{"object":"search_locations","hash":"MDBJ","name":"Cann River","state":"VIC","postcode":"3890","latitude":-37.5656808,"longitude":149.1499463,"url":"\/vic\/cann-river\/"},{"object":"search_locations","hash":"ME0F","name":"Chandlers Creek","state":"VIC","postcode":"3890","latitude":-37.305477639208,"longitude":149.32177574455,"url":"\/vic\/chandlers-creek\/"},{"object":"search_locations","hash":"MDBQ","name":"Noorinbee","state":"VIC","postcode":"3890","latitude":-37.508814728674,"longitude":149.21516802241,"url":"\/vic\/noorinbee\/"},{"object":"search_locations","hash":"MDBZ","name":"Noorinbee North","state":"VIC","postcode":"3890","latitude":-37.445372576153,"longitude":149.28497762777,"url":"\/vic\/noorinbee-north\/"},{"object":"search_locations","hash":"MDB6","name":"Tamboon","state":"VIC","postcode":"3890","latitude":-37.6842624134,"longitude":149.18708749828,"url":"\/vic\/tamboon\/"},{"object":"search_locations","hash":"M6ZU","name":"Tonghi Creek","state":"VIC","postcode":"3890","latitude":-37.602140415157,"longitude":149.06242795726,"url":"\/vic\/tonghi-creek\/"}]} ')['data']);
regions.push(JSON.parse('{"object":"list","data":[{"object":"search_locations","hash":"MDFP","name":"Genoa","state":"VIC","postcode":"3891","latitude":-37.47392,"longitude":149.5917737,"url":"\/vic\/genoa\/"},{"object":"search_locations","hash":"MDFQ","name":"Gipsy Point","state":"VIC","postcode":"3891","latitude":-37.487151325819,"longitude":149.68996897769,"url":"\/vic\/gipsy-point\/"},{"object":"search_locations","hash":"ME40","name":"Maramingo Creek","state":"VIC","postcode":"3891","latitude":-37.396276303328,"longitude":149.61725248193,"url":"\/vic\/maramingo-creek\/"},{"object":"search_locations","hash":"MDFX","name":"Wallagaraugh","state":"VIC","postcode":"3891","latitude":-37.435656809253,"longitude":149.74486777235,"url":"\/vic\/wallagaraugh\/"},{"object":"search_locations","hash":"ME18","name":"Wangarabell","state":"VIC","postcode":"3891","latitude":-37.39452731739,"longitude":149.48172340575,"url":"\/vic\/wangarabell\/"},{"object":"search_locations","hash":"MDCG","name":"Wingan River","state":"VIC","postcode":"3891","latitude":-37.629558659636,"longitude":149.52776555262,"url":"\/vic\/wingan-river\/"},{"object":"search_locations","hash":"ME19","name":"Wroxham","state":"VIC","postcode":"3891","latitude":-37.33716517964,"longitude":149.49129850525,"url":"\/vic\/wroxham\/"}]} ')['data']);

var jumps = document.querySelectorAll(".id-list")[0];
var target = document.querySelectorAll(".region-list")[0];
var a = regions.length;
for (r = 0; r < a; r++) {
    region = regions[r];
    var l = region.length;
    for (i = 0; i < l; i++) {
        var url = 'http://www.bom.gov.au/australia/meteye/forecast.php?lon='
            + region[i]['longitude']
            + '&lat='
            + region[i]['latitude']
            + '&dataUrl='
            + region[i]['url'];
        var ext = 'http://www.bom.gov.au/places/'
            + region[i]['url']
            + '/forecast';

        const mark = i + '_' + region[i]['name'];
        const shown = region[i]['name'];
        url = _globalHTTPS + url;
        fetch(url).then(function (response) {
            response.text().then(function (bom) {
               bom = bom.replace(/img src=\"/g, 'img src="' + _globalHTTPS + 'http://www.bom.gov.au');
                bom = bom.replace(/href=\"/g, 'target = "_blank" href="http://www.bom.gov.au');
                bom = bom.replace(/See text views for location/g, '(more details at BOM)');
                //console.log(bom);
                var box = document.createElement("div");
                box.innerHTML = bom;
                box.setAttribute("id", mark);
                box.setAttribute("class",'pad-pic');
                box.setAttribute("style",'max-height: 100%;padding: 20px;margin-bottom: 32px;margin-top: 32px;');
                target.appendChild(box);
                var marker = document.createElement("div");
                var jump = document.createElement("a");
                // jump.setAttribute("href", '#' + mark);
                jump.innerText = shown;
                jump.setAttribute("class", 'boxed');
                marker.setAttribute("onclick", 'document.getElementById("' + mark + '").scrollIntoView({behavior:"smooth"});');
                marker.setAttribute("class", 'box-floater');
                jumps.appendChild(marker);
                marker.appendChild(jump);
            });
        });
    };
};