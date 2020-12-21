
//////////////////////////////////////////////////////////////

// http://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/datavic/ows?
// http://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wms?
// https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs?
// https://base.maps.vic.gov.au/service?
// https://services.land.vic.gov.au/DELWPmaps/DFW/index.html

// https://services.arcgis.com/eWtBtpDzVX6pO9iZ/arcgis/rest/services/DCE_Development_View/FeatureServer/2/query?f=pbf&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A16280475.528509032%2C%22ymin%22%3A-5009377.08569302%2C%22xmax%22%3A17532819.799933027%2C%22ymax%22%3A-3757032.8142690174%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%2C%22latestWkid%22%3A3857%7D%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&returnCentroid=false&returnExceededLimitFeatures=false&maxRecordCountFactor=3&outSR=102100&resultType=tile&quantizationParameters=%7B%22mode%22%3A%22view%22%2C%22originPosition%22%3A%22upperLeft%22%2C%22tolerance%22%3A2445.984905125002%2C%22extent%22%3A%7B%22xmin%22%3A16280475.528509032%2C%22ymin%22%3A-5009377.08569302%2C%22xmax%22%3A17532819.79993303%2C%22ymax%22%3A-3757032.8142690193%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%2C%22latestWkid%22%3A3857%7D%7D%7D
// https://services.arcgis.com/eWtBtpDzVX6pO9iZ/arcgis/rest/services/FeaturesOfInterest/FeatureServer/0/query?f=geojson&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A16280475.528509032%2C%22ymin%22%3A-5009377.08569302%2C%22xmax%22%3A17532819.799933027%2C%22ymax%22%3A-3757032.8142690174%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%2C%22latestWkid%22%3A3857%7D%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&returnCentroid=false&returnExceededLimitFeatures=false&maxRecordCountFactor=3&outSR=102100&resultType=tile&quantizationParameters=%7B%22mode%22%3A%22view%22%2C%22originPosition%22%3A%22upperLeft%22%2C%22tolerance%22%3A2445.984905125002%2C%22extent%22%3A%7B%22xmin%22%3A16280475.528509032%2C%22ymin%22%3A-5009377.08569302%2C%22xmax%22%3A17532819.79993303%2C%22ymax%22%3A-3757032.8142690193%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%2C%22latestWkid%22%3A3857%7D%7D%7D
// http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps
// http://services.land.vic.gov.au/arcgis/rest/services
// https://services2.arcgis.com/18ajPSI0b3ppsmMt/arcgis/rest/services
// https://services1.arcgis.com/vHnIGBHHqDR6y0CR/arcgis/rest/services
// http://data.vicroads.vic.gov.au/arcgis/rest/services
// http://emap.ffm.vic.gov.au/arcgis/rest/services
// https://nkmaps.biodiversity.vic.gov.au/arcgis/rest/services
// https://gisportal.melbourne.vic.gov.au/server_wa/rest/services

// https://gis.mapshare.vic.gov.au/arcgis/rest/
// https://gis.mapshare.vic.gov.au/arcgis/rest/services
// https://stg-gis.mapshare.vic.gov.au/arcgis/rest/services
// https://geo.mapshare.vic.gov.au/arcgis/rest/services
// http://uat-gis.mapshare.vic.gov.au/arcgis/rest/
// http://mapshare.vic.gov.au/Geocortex/Essentials/EXT/REST/sites

// https://services.arcgis.com/eWtBtpDzVX6pO9iZ/ArcGIS/rest/services <--AUTH req'd!!!
// https://dservices.arcgis.com/eWtBtpDzVX6pO9iZ/arcgis/services/

// http://www.bom.gov.au/climate/outlooks/mapcache
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
var _globalLayerParity = 0;
var _globalControl = null;
var _globalLegend = null;
var _legendElement = null;
var _legendList = [];
var _focusLayer = null;
var _floatLayers = [];
var _parityCallbacks = [];

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

function addParityCallback(callback) {
    _parityCallbacks.push(callback);
}

function resetParityCallbacks() {
    _parityCallbacks = [];
}

function runParityCallbacks() {
    _globalLayerParity--;
    if(!_parityCallbacks) {
        return;
    }
    var repeatCalls = [];
    var closed;
    if (_globalLayerParity == 0) {
        for (i = 0; i < _parityCallbacks.length; i++) {
            closed = _parityCallbacks[i](_globalMap);
            if (!closed) {
                repeatCalls.push(_parityCallbacks[i]);
            };
        }
    }
    Object.assign(_parityCallbacks, repeatCalls);
}

function sortFloatLayers() {
    _floatLayers.sort(function(a,b){
        return a.zIndex - b.zIndex;
    });
}

function resetFloatLayers() {
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
    var prefix = _globalMap.getCenter().toString() + "<br>";
    freshmap.invalidateSize();
    if (_globalLayerParity > 0) {
        prefix = "<b style='color:blue'>LOADING:</b> " + _globalLayerParity + " more layers.<br>" + prefix;
    }
    _globalMap.attributionControl.setPrefix(prefix);
    sortFloatLayers();
    for (f = 0; f < _floatLayers.length; f++) {
       _floatLayers[f].layer.bringToFront();
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
        var icon = symbol.marker ? symbol.marker : null;
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

function getGeojson(URL, theMap, styleUI, addto, listed, transform, callback) {
    _globalLayerParity++;
    addto = (typeof (addto) !== 'undefined') ? addto : true;
    var WFSLayer = null;
    var _symStyles = styleUI.applyStyles;
    var _symPoints = styleUI.applyPoints;
    var _popupFilters = styleUI.applyPopups;
    var _zIndex = styleUI.zIndex;

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
                }
                if (addto) {
                    WFSLayer.addTo(theMap);
                    if(!listed){
                        _zIndex=(typeof(_zIndex)!=='undefined')?_zIndex:0;
                        _floatLayers.push({layer: WFSLayer, zIndex: _zIndex});
                    }
                }
                if (typeof callback === "function") {
                    callback(WFSLayer);
                }
                runParityCallbacks();
                return WFSLayer;
            });
    }).catch(function () {
        runParityCallbacks(null);
    });
}


function getOverlays() {
    // create hash to hold all layers
    var layers = {};

    // loop thru all layers in control
    _globalControl._layers.forEach(function (obj) {
        var layerName;

        // check if layer is an overlay
        if (obj.overlay) {
            // get name of overlay
            layerName = obj.name;
            if (_globalControl._map.hasLayer(obj.layer)) {
                return layers[layerName] = _globalControl._map.hasLayer(obj.layer);
            }
        }
    });

    return layers;
}

/*
  map.on('zoomend ', function(e) {
         if ( map.getZoom() > 13 ){ map.removeLayer( vector )}
         else if ( map.getZoom() <= 13 ){ map.addLayer( vector )}
    });
*/
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
    pad = (typeof (pad) !== 'undefined') ? pad : 1;
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
    return myStretch;
}

function toLatLngBBoxString(bbox) {
    return bbox._southWest.lat + ',' + bbox._southWest.lng + ',' + bbox._northEast.lat + ',' + bbox._northEast.lng;
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
