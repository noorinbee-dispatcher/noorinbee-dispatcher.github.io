var routeLayers = new pannedLayerSet();

function buildCustomRoutes(mymap) {

    routeLayers.isInZoomRange = function () {
        return true;
    }

    routeLayers.buildLayeredSet =
        function () {

    // line to poly!

    var URL = "";
    var layerParameters =  this.getBoundedRequest(0.9); //getGeneralLayerQuery();
    var rootUrl = 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs';

    var bufferLine = function (buffering) {
        return turf.buffer(buffering, 1.25, { units: 'metres' });
    };
    var bufferLineWide = function (buffering) {
        return turf.buffer(buffering, 2.5, { units: 'metres' });
    };

    var _polyLinework = getMainLineStyle();
    _polyLinework.symbology.color="#1051ad";

    var _polyLightLinework = getMainLineStyle();    
    _polyLightLinework.symbology.weight = 2.25;
    // _polyLinework.symbology.color = "#930eab";
    _polyLightLinework.symbology.opacity = 0.85;
    _polyLightLinework.symbology.fillOpacity = 0.15;
    _polyLightLinework.symbology.dashArray = '2.5, 6.5';

    legendStyle(
        "Tour", { marker: "line", options: _polyLinework.symbology }
    );
    legendStyle(
        "Walk, Cycle", { marker: "line", options: _polyLightLinework.symbology }
    );
    _polyLinework._symFilter = function (feature) {
        return true;
    }
    _polyLightLinework._symFilter = function (feature) {
        return true;
    }

    var _popupTrans = function (layer) {
        if(layer.feature.properties.NAME) {
            return layer.feature.properties.NAME;
        }
        var ezi = (layer.feature.properties.EZI_ROAD_NAME_LABEL == "Unnamed")
            ? "Track" : layer.feature.properties.EZI_ROAD_NAME_LABEL;
            // ezi = (ezi ?ezi: layer.feature.properties.LEFT_LOCALITY);
        return ezi; //?ezi:layer.feature.properties.RIGHT_LOCALITY;
    }
    var lightStyling = {
        applyStyles: [_polyLightLinework],
        applyPoints: [],
        applyPopups: _popupTrans,
        zIndex: 5
    };
    layerParameters.typeName = 'datavic:VMTRANS_WALKING_TRACK';
    layerParameters.typeName += ',datavic:VMTRANS_TR_ROAD_BIKE_PATH';
    layerParameters.typeName += ',datavic:VMTRANS_TR_RAIL_TRAIL';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    // getGeojson(URL, mymap, lightStyling, false, "Walking, Cycling", bufferLineWide);
    this.getControlledPannedProcessLayer("Walking, Cycling", URL, lightStyling,bufferLineWide);

    var _popupTour = function (layer) {
        if (layer.feature.properties.F_COMMENT) {
            return layer.feature.properties.F_COMMENT
                + " (" + layer.feature.properties.F_DISTANCE
                + layer.feature.properties.F_DISTUOM + ")";
        }
        return layer.feature.properties.COMMENTS + " - "
            + layer.feature.properties.ACCESS_DSC
            + " (" + layer.feature.properties.TRK_CLASS + ")";
    }
    var lineStyling = {
        applyStyles: [_polyLinework],
        applyPoints: [],
        applyPopups: _popupTour,
        zIndex: 5
    };
    layerParameters.typeName = 'datavic:FORESTS_RECWEB_TRACK';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    // getGeojson(URL, mymap, lineStyling, true, "Touring", bufferLine); 
    this.getControlledPannedProcessLayer("Touring", URL, lineStyling,bufferLine);
}

routeLayers.attachSet(mymap);

}
