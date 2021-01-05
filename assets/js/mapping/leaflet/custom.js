function buildCustomMap(pageMap, pageLegend, mapSettings) {

    var atLat = -37.56655532524054;
    var atLng = 149.1559270001807;
    var atZoom = 11;
    if (typeof (mapSettings.lat) !== "undefined") {
        atLat = mapSettings.lat;
    }
    if (typeof (mapSettings.lng) !== "undefined") {
        atLng = mapSettings.lng;
    }
    if (typeof (mapSettings.lat) !== "undefined") {
        atZoom = mapSettings.zoom;
    }

    var mymap = L.map(pageMap, { attributionControl: false })
        .setView([atLat, atLng], atZoom);
    var legend = L.map(pageLegend, {
        zoomControl: false, attributionControl: false, dragging: false
    }).setView([0, 0], 1);

    connectMap(mymap);
    connectLegend(legend, 'legend');

    var carto = baseVicWms("CARTO_VG").addTo(mymap);
    var photo = baseVicWms("AERIAL_VG");
    var ovrly = baseVicWms("CARTO_OVERLAY_VG");

    var compo = L.layerGroup([photo, ovrly]);
    var google = baseGoogleTiles();

    var baseMaps = {
        "Basemap": carto,
        "Image (VicGov)": compo,
        "Terrain (Google)": google,
    };

    var popControl = L.control.layers(baseMaps, null, { sortLayers: true });
    connectControl(popControl);

    popControl.addTo(mymap);
    L.control.scale({ imperial: false, metric: true, updateWhenIdle: true }).addTo(mymap);
    L.control.attribution({ prefix: false }).addAttribution("Data: DELWP Web Map Services").addTo(mymap);
    setFocusLayer(L.tileLayer(''));
    freshenLeaflet(mymap);

    return mymap;

}


////////////////////////////////////////////////

function getMainPolyStyle() {
    return {
        symbology: {
            fillColor: "#930eab", //EAAFD8",
            color: "#edbbcd", //FAEFA8",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5,
        },
        _symFilter: function (feature) { return null; }
    };
}

function getMainPointStyle() {
    var _sym = { symbology: {} };
    Object.assign(_sym.symbology, getMainPolyStyle().symbology);
    _sym.symbology.radius = 8;
    return _sym;
}

function getMainLineStyle() {
    var _polyLinework = { symbology: {} };
    Object.assign(_polyLinework.symbology, getMainPolyStyle().symbology);
    _polyLinework.symbology.weight = 3;
    _polyLinework.symbology.color = "#930eab";
    _polyLinework.symbology.opacity = 0.5;
    // _polyLinework.symbology.radius = 2;
    return _polyLinework;
}

function getAltLineStyle() {
    var _trackLinework = { symbology: {} };
    // Object.assign(_polyLinework.symbology, getMainPolyStyle().symbology);
    _trackLinework.symbology.weight = 1.75;
    _trackLinework.symbology.opacity = 0.85;
    _trackLinework.symbology.color = "#e09951";
    _trackLinework._symFilter = function (feature) {
        return true;
    }
    return _trackLinework;
}

function getMinorPointStyle() {
    return {
        symbology: {
            radius: 4,
            fillColor: "#F49F68",
            color: "#F4CF78",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8,
        },
        _symFilter: function (feature) { return null; }
    };
}

function getBboxAsCql() {
    return "BBOX(SHAPE, "+getBboxAsString()+")";
}

function getBboxAsString() {
    return '-37.853854677977594,148.09321731872052,-36.620632663222686,150.03230420798283';
}

function getGeneralLayerQuery() {
    return {
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        // maxFeatures: 200,
        outputFormat: 'application/json',
        bbox: getBboxAsString(),
    };
}

function getCqlLayerQuery(cql) {
    return {
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        // maxFeatures: 200,
        outputFormat: 'application/json',
        cql_filter: cql, // BBOX('SHAPE', -37.853854677977594,148.09321731872052,-36.620632663222686,150.03230420798283)
    };
}
////////////////////////////////////////////////




    ////////////////////////////////////////////////

    // var wmsLayer = L.tileLayer.wms("http://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/datavic/ows?", {
    //   dpiMode: '7',
    //   featureCount: '10',
    //   layers: 'VMTRANS_TR_ROAD',
    //     format: 'image/png',
    //     transparent: 'true',
    // }).addTo(mymap);
    // var wmsLayer = L.tileLayer.wms(", {
    //   dpiMode: '7',
    //   featureCount: '10',
    //   layers: 'FLORAFAUNA1_NV2005_EVCBCS_9_1,FLORAFAUNA1_NV1750_EVCBCS_9_1',
    //     format: 'image/png',
    //     transparent: 'true',
    // }).addTo(mymap);