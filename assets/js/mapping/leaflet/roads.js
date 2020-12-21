
var _holdRoads = null;
var _roadsAreLoading = false;
var _roadTracks, _roadsFwd, _roadsBlocked;

function buildCustomRoads(mymap) {
    var onmap = mymap;
    mymap.on('zoomend ', function (e) {
        if (onmap.getZoom() < 13 && _holdRoads) {
            onmap.removeLayer(_holdRoads);
            _holdRoads = null;
            return;
        }
        if (onmap.getZoom() > 12) {
            if (!_holdRoads && !_roadsAreLoading) {
                buildLayeredRoads(onmap);
            }
        }
    });
    mymap.on('moveend', function(e) {
        if(_holdRoads && !_roadsAreLoading) {
            buildLayeredRoads(onmap);
        }
    });
}

function roadsAreLoaded() {
    if (!_roadTracks || !_roadsFwd || !_roadsBlocked) {
        return false;
    }
    _roadsAreLoading = false;
    return true;
}


function builtRoadsCallback(mymap) {
   if(!roadsAreLoaded()) {
       return false;
   }

    if(_holdRoads) {
        mymap.removeLayer(_holdRoads);
    }
    _roadsBlocked.setZIndex(30);
    _roadTracks.setZIndex(10);
    _roadsFwd.setZIndex(20);
    _holdRoads = L.layerGroup([_roadsBlocked, _roadTracks, _roadsFwd, ]);
    _holdRoads.addTo(mymap);
    return true;
}

function buildLayeredRoads(mymap) {

    _roadsAreLoading = true;

    var URL = "";
    var layerParameters = getGeneralLayerQuery();
    layerParameters.bbox = toLatLngBBoxString(hangEdges(mymap.getBounds(), 0.825));
    var rootUrl = 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs?';

    // var bufferLine = function (buffering) {
    //     return turf.buffer(buffering, 1.5, { units: 'metres' });
    // };

    var _trackLinework = getAltLineStyle();
    // _trackLinework.symbology.weight = 1.25;
    // _trackLinework.symbology.opacity = 0.85;
    // _trackLinework.symbology.color = "#e09951";
    // _trackLinework._symFilter = function (feature) {
    //     return true;
    // }

    var _popupTrans = function (layer) {
        var ezi = (layer.feature.properties.EZI_ROAD_NAME_LABEL == "Unnamed")
            ? "Minor Road" : layer.feature.properties.EZI_ROAD_NAME_LABEL;
        // ezi = (ezi ?ezi: layer.feature.properties.LEFT_LOCALITY);
        return ezi; //?ezi:layer.feature.properties.RIGHT_LOCALITY;
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
    // .then(function(lyr) {_roadTracks=lyr});

    
    var _fwdLinework = getAltLineStyle();
    // _fwdLinework.symbology.weight = 1.25;
    // _fwdLinework.symbology.opacity = 0.85;
    // _fwdLinework.symbology.color = "#e09951";
    // _fwdLinework._symFilter = function (feature) {
    //     return true;
    // }
    _fwdLinework.symbology.dashArray = '7.5, 4';
    var _popupTrans = function (layer) {
        var ezi = (layer.feature.properties.EZI_ROAD_NAME_LABEL == "Unnamed")
            ? null : layer.feature.properties.EZI_ROAD_NAME_LABEL;
        ezi = (ezi ? ezi : "4wd: "+layer.feature.properties.LEFT_LOCALITY);
        return ezi ? ezi : "4wd: "+layer.feature.properties.RIGHT_LOCALITY;
    }
    var fwdStyling = {
        applyStyles: [_fwdLinework],
        applyPoints: [],
        applyPopups: _popupTrans,
        zIndex: 5
    };
    layerParameters.typeName = 'datavic:VMTRANS_TR_ROAD_4WD';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    addRoad = function (lyr) {
        _roadsFwd = lyr;
        builtRoadsCallback(mymap);
    };
    getGeojson(URL, mymap, fwdStyling, false, null, null, addRoad);

    
    var _closedLinework = getAltLineStyle();
    // _closedLinework.symbology.weight = 1.25;
    // _closedLinework.symbology.opacity = 0.85;
    _closedLinework.symbology.color = "#ecf720";
    // _closedLinework._symFilter = function (feature) {
    //     return true;
    // }
    _fwdLinework.symbology.weight = 1.75;
    _closedLinework.symbology.dashArray = '6, 3.5';
    var _popupTrans = function (layer) {
        var ezi = (layer.feature.properties.EZI_ROAD_NAME_LABEL == "Unnamed")
            ? null : layer.feature.properties.EZI_ROAD_NAME_LABEL;
        ezi = (ezi ? ezi : "Closed: "+layer.feature.properties.LEFT_LOCALITY);
        return ezi ? ezi : "Closed: "+layer.feature.properties.RIGHT_LOCALITY;
    }
    var closedStyling = {
        applyStyles: [_closedLinework],
        applyPoints: [],
        applyPopups: _popupTrans,
        zIndex: 5
    };
    layerParameters.typeName = 'datavic:VMTRANS_TR_ROAD_UNMAINTAINED';
    layerParameters.typeName += ',datavic:VMTRANS_TR_ROAD_CLOSED';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    addRoad = function (lyr) {
        _roadsBlocked = lyr;
        builtRoadsCallback(mymap);
    };
    getGeojson(URL, mymap, closedStyling, false, null, null, addRoad);


}
