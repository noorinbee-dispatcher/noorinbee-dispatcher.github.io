
function buildCustomRoutes(mymap) {

    // line to poly!

    var URL = "";
    var layerParameters = getGeneralLayerQuery();
    var rootUrl = 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs?';

    var bufferLine = function (buffering) {
        return turf.buffer(buffering, 1.5, { units: 'metres' });
    };

    var _polyLinework = getMainLineStyle();
    var _polyLightLinework = getMainLineStyle();
    
    _polyLightLinework.symbology.weight = 1.25;
    // _polyLinework.symbology.color = "#930eab";
    _polyLightLinework.symbology.opacity = 0.85;

    legendStyle(
        "Routes", { marker: "line", options: _polyLinework.symbology }
    );
    _polyLinework._symFilter = function (feature) {
        return true;
    }
    _polyLightLinework._symFilter = function (feature) {
        return true;
    }

    var _popupTrans = function (layer) {
        var ezi = (layer.feature.properties.EZI_ROAD_NAME_LABEL == "Unnamed")
            ? null : layer.feature.properties.EZI_ROAD_NAME_LABEL;
            ezi = (ezi ?ezi: layer.feature.properties.LEFT_LOCALITY);
        return ezi?ezi:layer.feature.properties.RIGHT_LOCALITY;
    }
    layerParameters.typeName = 'datavic:VMTRANS_WALKING_TRACK';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getWFS(URL, mymap, [_polyLightLinework], [], _popupTrans, false, "Walking", bufferLine);
    //clip_Bicycle Paths - Road Network - Vicmap Transport
    //clip_Road Permanently Closed - Road Network - Vicmap Transport
    //clip_Road Permanently Closed - Road Network - Vicmap Transport
    //clip_Road Permanently Closed - Road Network - Vicmap Transport

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
    layerParameters.typeName = 'datavic:FORESTS_RECWEB_TRACK';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getWFS(URL, mymap, [_polyLinework], [], _popupTour, true, "Exploring", bufferLine);

}
