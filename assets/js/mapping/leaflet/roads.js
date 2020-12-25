
var _holdRoads = null;
var _roadsAreLoading = false;
var _roadTracks, _roadsFwd, _roadsBlocked, _roadsLimited, _roadsCore;

function buildCustomRoads(mymap) {
    applyRoadLoader(mymap);
    mymap.on('zoomend', function (e) {
        applyRoadLoader(mymap);
    });
    mymap.on('moveend', function (e) {
        if (_holdRoads && !_roadsAreLoading) {
            buildLayeredRoads(mymap);
        }
    });
}

function applyRoadLoader(onmap) {

    if (onmap.getZoom() < 13 && _holdRoads) {
        dropRoads(onmap);
        _holdRoads = null;
        return;
    }
    if (onmap.getZoom() > 12) {
        if (!_holdRoads && !_roadsAreLoading) {
            buildLayeredRoads(onmap);
        }
    }
}
function roadsAreLoaded() {
    if (!_roadTracks || !_roadsFwd || !_roadsBlocked || !_roadsLimited || !_roadsCore) {
        return false;
    }
    _roadsAreLoading = false;
    return true;
}

function dropRoads(mymap) {
    if (!_holdRoads) { return; }
    for (i = 0; i < _holdRoads.length; i++) {
        mymap.removeLayer(_holdRoads[i]);
    }
    _holdRoads = null;
}

function showRoads(mymap) {
    for (i = 0; i < _holdRoads.length; i++) {
        _holdRoads[i].addTo(mymap);
    }
}


function builtRoadsCallback(mymap) {
    if (!roadsAreLoaded()) {
        return false;
    }

    dropRoads(mymap);
    _holdRoads = [_roadTracks, _roadsFwd, _roadsBlocked,_roadsLimited,_roadsCore];
    showRoads(mymap);
    return true;
}

function buildLayeredRoads(mymap) {

    _roadsAreLoading = true;

    var URL = "";
    var layerParameters = getGeneralLayerQuery();
    layerParameters.bbox = toLatLngBBoxString(hangEdges(mymap.getBounds(), 1.15));
    var rootUrl = 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs?';

    var _trackLinework = getAltLineStyle();
    var _popupTrans = function (layer) {
        var ezi = (layer.feature.properties.EZI_ROAD_NAME_LABEL == "Unnamed")
            ? "Minor Road" : layer.feature.properties.EZI_ROAD_NAME_LABEL;
        return ezi;
    }
    var trackStyling = {
        applyStyles: [_trackLinework],
        applyPoints: [],
        applyPopups: _popupTrans,
        zIndex: 5
    };
    layerParameters.typeName = 'datavic:VMTRANS_TR_ROAD_TRACKS';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    var addRoad = function (lyr) {
        _roadTracks = lyr;
        builtRoadsCallback(mymap);
    };
    getGeojson(URL, mymap, trackStyling, false, null, null, addRoad);


    var _fwdLinework = getAltLineStyle();
    _fwdLinework.symbology.dashArray = '7.5, 6.25';
    var _popupTrans = function (layer) {
        var ezi = (layer.feature.properties.EZI_ROAD_NAME_LABEL == "Unnamed")
            ? null : layer.feature.properties.EZI_ROAD_NAME_LABEL+" (4wd)";
        ezi = (ezi ? ezi : "4wd: " + layer.feature.properties.LEFT_LOCALITY);
        return ezi ? ezi : "4wd: " + layer.feature.properties.RIGHT_LOCALITY;
    }
    var fwdStyling = {
        applyStyles: [_fwdLinework],
        applyPoints: [],
        applyPopups: _popupTrans,
        zIndex: 1
    };
    layerParameters.typeName = 'datavic:VMTRANS_TR_ROAD_4WD';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    addRoad = function (lyr) {
        _roadsFwd = lyr;
        builtRoadsCallback(mymap);
    };
    getGeojson(URL, mymap, fwdStyling, false, null, null, addRoad);


    var _closedLinework = getAltLineStyle();
    _closedLinework.symbology.color = "#eef0a5";//"#ecf720";
    _closedLinework.symbology.weight = 1.75;
    _closedLinework.symbology.dashArray = '6, 3.5';
    var _popupTrans = function (layer) {
        var ezi = (layer.feature.properties.EZI_ROAD_NAME_LABEL == "Unnamed")
            ? null : layer.feature.properties.EZI_ROAD_NAME_LABEL;
        ezi = (ezi ? ezi : "Closed: " + layer.feature.properties.LEFT_LOCALITY);
        return ezi ? ezi : "Closed: " + layer.feature.properties.RIGHT_LOCALITY;
    }
    var closedStyling = {
        applyStyles: [_closedLinework],
        applyPoints: [],
        applyPopups: _popupTrans,
        zIndex: 4
    };
    layerParameters.typeName = 'datavic:VMTRANS_TR_ROAD_UNMAINTAINED';
    layerParameters.typeName += ',datavic:VMTRANS_TR_ROAD_CLOSED';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    addRoad = function (lyr) {
        _roadsBlocked = lyr;
        builtRoadsCallback(mymap);
    };
    getGeojson(URL, mymap, closedStyling, false, null, null, addRoad);

//private
//management
//seasonal
    var _privateLinework = getAltLineStyle();
    _privateLinework.symbology.color = "#ebc7e8";
    _privateLinework.symbology.weight = 1.75;
    var _popupTrans = function (layer) {
        var ezi = (layer.feature.properties.EZI_ROAD_NAME_LABEL == "Unnamed")
            ? null : layer.feature.properties.EZI_ROAD_NAME_LABEL;
        ezi = (ezi ? ezi : "Not public: " + layer.feature.properties.LEFT_LOCALITY);
        return ezi ? ezi : "Not public: " + layer.feature.properties.RIGHT_LOCALITY;
    }
    var privateStyling = {
        applyStyles: [_privateLinework],
        applyPoints: [],
        applyPopups: _popupTrans,
        zIndex: 4
    };
    layerParameters.typeName = 'datavic:VMTRANS_TR_ROAD_MANAGEMENT_VEHICLES';
    layerParameters.typeName += ',datavic:VMTRANS_TR_ROAD_PRIVATE';
    layerParameters.typeName += ',datavic:VMTRANS_TR_ROAD_SEASONAL';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    addRoad = function (lyr) {
        _roadsLimited = lyr;
        builtRoadsCallback(mymap);
    };
    getGeojson(URL, mymap, privateStyling, false, null, null, addRoad);

//collector & local
    var _coreLinework = getAltLineStyle();
    _coreLinework.symbology.color = "#ad4805";
    _coreLinework.symbology.weight = 2;
    var _popupTrans = function (layer) {
        var ezi = (layer.feature.properties.EZI_ROAD_NAME_LABEL == "Unnamed")
            ? null : layer.feature.properties.EZI_ROAD_NAME_LABEL;
        ezi = (ezi ? ezi : "Road: " + layer.feature.properties.LEFT_LOCALITY);
        return ezi ? ezi : "Road: " + layer.feature.properties.RIGHT_LOCALITY;
    }
    var coreStyling = {
        applyStyles: [_coreLinework],
        applyPoints: [],
        applyPopups: _popupTrans,
        zIndex: 4
    };
    layerParameters.typeName = 'datavic:VMTRANS_TR_ROAD_COLLECTOR';
    layerParameters.typeName += ',datavic:VMTRANS_TR_ROAD_LOCAL';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    addRoad = function (lyr) {
        _roadsCore = lyr;
        builtRoadsCallback(mymap);
    };
    getGeojson(URL, mymap, coreStyling, false, null, null, addRoad);

}
