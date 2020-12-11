
//////////////////////////////////////////////////////////////

// http://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/datavic/ows?
// https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs?
// http://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wms?
// http://www.bom.gov.au/climate/outlooks/mapcache
// https://base.maps.vic.gov.au/service?
// https://services.land.vic.gov.au/DELWPmaps/DFW/index.html
// https://www.openstreetmap.org/

// typeName: 'datavic:FORESTS_OG100', 
//, ,datavic:FORESTS_OG100 datavic:FLORAFAUNA1_NV2005_EVCBCS_9_1',datavic:FORESTS_RECWEB_POI
// CROWNLAND_PLM25_COASTAL_RES
// CROWNLAND_PLM25_COMM_USE_AREA
// ??? datavic:CROWNLAND_PLM25_FOREST_PARK
// ?showgrounds? datavic:CROWNLAND_PLM25_NPA_SHED_4
// datavic:CROWNLAND_PLM25_NATURAL_FEAT
// datavic:CROWNLAND_PLM25_NATURE_CONSERV
// datavic:CROWNLAND_PLM25_WILDERNESS
// datavic:CROWNLAND_PLM25_ALPINE_RESORT
// datavic:FORESTS_RECWEB_TRACK
// datavic:FORESTS_RECWEB_POI
// datavic:FORESTS_RECWEB_HISTORIC_RELIC
// +'datavic:FORESTS_RECWEB_POI,'

//////////////////////////////////////////////////////////////

var _globalMap = null;
var _globalControl = null;
var _globalLegend = null;
var _legendElement = null;
var _legendList = [];
var _focusLayer = null;
var _floatLayers = [];

function connectMap(theMap) {
    _globalMap = theMap;
}

function connectLegend(theLegend, id) {
    _globalLegend = theLegend;
    _legendElement = document.getElementById(id);
}

function connectControl(theControl) {
    _globalControl = theControl;
}

function setFocusLayer(theLayer) {
    _focusLayer = theLayer;
}

function setFloatLayer(theLayers) {
    _floatLayers = theLayers;
}

function resetFloatLayer(theLayers) {
    _floatLayers = [];
}
// VIC Basemaps:
//CARTO_VG CARTO_OVERLAY_VG AERIAL_VG
function baseVicWms(name) {
    var baseVic = "https://base.maps.vic.gov.au/service?";
    var wmsLayer = L.tileLayer.wms(baseVic, {
        dpiMode: '7',
        featureCount: '10',
        format: 'image/png',
        layers: name,
        transparent: true,
    });
    return wmsLayer;
}


function freshenLeaflet(freshmap) {
    var recall = freshmap;
    freshmap.invalidateSize();
    _globalMap.attributionControl.setPrefix(_globalMap.getCenter().toString() + "<br>");
    for (f = 0; f < _floatLayers.length; f++) {
        _floatLayers[f].bringToFront();
    }
    _focusLayer.bringToFront();
    setTimeout(function () { freshenLeaflet(recall); }, 750);
}

function legendStyle(desc, symbol) {
    if (typeof legendStyle.counter == 'undefined') {
        legendStyle.counter = 0;
    }

    if (!(desc in _legendList)) {
        var eh = _legendElement.offsetHeight;
        eh += 36;
        _legendElement.style.height = eh + "px";
        var oh = 36 * (legendStyle.counter + 2) / 2;
        var mid = _globalLegend.layerPointToLatLng([128, oh]);
        _globalLegend.invalidateSize();
        _globalLegend.panTo(mid);

        var applying = symbol.options;
        var icon = symbol.marker ?? null;
        var tagx = 20;
        legendStyle.counter++;
        applying.locx = 64;
        applying.locy = (36 * legendStyle.counter);
        _legendList[desc] = applying;
        var blot;
        if (!icon) {
            blot = new L.circleMarker(
                _globalLegend.layerPointToLatLng([applying.locx, applying.locy]), {
                radius: applying.radius, //8,
                fillColor: applying.fillColor, //"#CA6FA8",
                color: applying.color, //"#AA78B0",
                weight: applying.weight, //1,
                opacity: applying.opacity, //1,
                fillOpacity: applying.fillOpacity, //0.3,
            });
        } else {
            if (icon == "line") {
                tagx = 23;
                blot = new L.rectangle([
                    _globalLegend.layerPointToLatLng([applying.locx - 22, applying.locy - 1]),
                    _globalLegend.layerPointToLatLng([applying.locx + 16, applying.locy + 1])
                ], {
                    fillColor: applying.fillColor, //"#CA6FA8",
                    color: applying.color, //"#AA78B0",
                    weight: applying.weight, //1,
                    opacity: applying.opacity, //1,
                    fillOpacity: applying.fillOpacity, //0.3,
                });
            }
            if (icon == "block") {
                tagx = 20;
                blot = new L.rectangle([
                    _globalLegend.layerPointToLatLng([applying.locx - 12, applying.locy - 8]),
                    _globalLegend.layerPointToLatLng([applying.locx + 12, applying.locy + 8])
                ], {
                    fillColor: applying.fillColor, //"#CA6FA8",
                    color: applying.color, //"#AA78B0",
                    weight: applying.weight, //1,
                    opacity: applying.opacity, //1,
                    fillOpacity: applying.fillOpacity, //0.3,
                });
            }
        }
        if (blot) {
            blot.bindTooltip(desc, { permanent: true, className: "legend-label", offset: [tagx, 0], opacity: 0.85 });
            blot.addTo(_globalLegend);
        }
    }
    return symbol;
}

function getWFS(URL, theMap, _symStyles, _symPoints, _popupFilters, addto, listed, transform) {
    addto = addto ?? true;
    var WFSLayer = null;

    fetch(URL).then(function (response) {
        response.json().then(function (lyr) {
            if (typeof transform === "function") {
                lyr = transform(lyr);
            }
            WFSLayer = L.geoJson(lyr, {
                style: function (feature) {
                    for (var s = 0; s < _symStyles.length; s++) {
                        styled = _symStyles[s]._symFilter(feature);
                        if (styled) {
                            return _symStyles[s].symbology;
                        }
                    }
                },
                pointToLayer: function (feature, latlng) {
                    for (var p = 0; p < _symPoints.length; p++) {
                        pointed = _symPoints[p]._symFilter(feature);
                        if (pointed) {
                            return legendStyle(
                                pointed,
                                L.circleMarker(latlng, _symPoints[p].symbology)
                            );
                        }
                    }
                }

            }).bindPopup(function (layer) {
                return _popupFilters(layer);
            })
        })
            .then(function () {
                if (listed) {
                    _globalControl.addOverlay(WFSLayer, listed);
                } else {
                    _floatLayers.push(WFSLayer);
                }
                if (addto) {
                    WFSLayer.addTo(theMap);
                }
                return WFSLayer;
            });
    });
}


//////////////////////////////////////////////////////
/*
// https://gis.stackexchange.com/questions/169129/how-to-add-a-bounding-box-filter-to-this-leaflet-wfs-request
 
Simply use map.getBounds(), maybe with a little bit of padding.
Once you have that latLngBounds, you could try the toBBoxString()
as value for your "bbox" parameter.
Then on map move end event re-send your request and replace your geoJson layer by the new data.
*/
//////////////////////////////////////////////////////

// eg:     myLimitBox = hangEdges(mymap.getBounds()).toBBoxString();

function hangEdges(myBounds, pad) {
    pad = pad ?? 1;
    console.log(myBounds);
    var myMid = {
        lat: (myBounds._northEast.lat + myBounds._southWest.lat) / 2,
        lng: (myBounds._northEast.lng + myBounds._southWest.lng) / 2,
    };
    var ne = L.latLng(
        myMid.lat + ((myBounds._northEast.lat - myMid.lat) * pad),
        myMid.lng + ((myBounds._northEast.lng - myMid.lng) * pad)
    );
    var sw = L.latLng(
        myMid.lat + ((myBounds._southWest.lat - myMid.lat) * pad),
        myMid.lng + ((myBounds._southWest.lng - myMid.lng) * pad)
    );
    myStretch = L.latLngBounds(ne, sw);
    console.log(myStretch);
    return myStretch;
}

/* turf => for things like:

    var bufferLine = function(buffering) {
        return turf.buffer(buffering, 25, {units: 'metres'});
    };

    */

    // // // pointToLayer: function (feature, latlng) {
    // // //     //     return L.marker(latlng, {
    // // //     //         // icon
    // // //     //         // keyboard
    // // //     //         // title
    // // //     //         // alt
    // // //     //         // zIndexOffset
    // // //     //         // opacity
    // // //     //         // riseOnHover
    // // //     //         // riseOffset
    // // //     //         // pane
    // // //     //         // shadowPane
    // // //     //     });
    // // //     // },
    // // //     return L.circleMarker(latlng, {
    // // //     });
    // // // }

    // // //             style: function (feature) {
    // // //                 return {
    // // //                 };
    // // //                 // {
    // // //                 // stroke	Boolean	true	Whether to draw stroke along the path. Set it to false to disable borders on polygons or circles.
    // // //                 // color	String	'#3388ff'	Stroke color
    // // //                 // weight	Number	3	Stroke width in pixels
    // // //                 // opacity	Number	1.0	Stroke opacity
    // // //                 // lineCap	String	'round'	A string that defines shape to be used at the end of the stroke.
    // // //                 // lineJoin	String	'round'	A string that defines shape to be used at the corners of the stroke.
    // // //                 // dashArray	String	null	A string that defines the stroke dash pattern. Doesn't work on Canvas-powered layers in some old browsers.
    // // //                 // dashOffset	String	null	A string that defines the distance into the dash pattern to start the dash. Doesn't work on Canvas-powered layers in some old browsers.
    // // //                 // fill	Boolean	depends	Whether to fill the path with color. Set it to false to disable filling on polygons or circles.
    // // //                 // fillColor	String	*	Fill color. Defaults to the value of the color option
    // // //                 // fillOpacity	Number	0.2	Fill opacity.
    // // //                 // };
    // // //             }

