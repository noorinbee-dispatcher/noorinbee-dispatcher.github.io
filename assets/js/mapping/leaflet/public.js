
function buildCustomAreas(mymap) {

    // recweb & public areas:

    var URL = "";
    var layerParameters = getGeneralLayerQuery();

    var rootUrl = 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs?';

    var _polyInterest = getMainPolyStyle();
    _polyInterest.symbology.fillColor = "#e3e346"; //"#71751e", //EAAFD8",
    _polyInterest.symbology.color = "#c6d968"; //"#b8db44", //FAEFA8",

    legendStyle(
        "Public Space", { marker: "block", options: _polyInterest.symbology }
    );

    _polyInterest._symFilter = function (feature) {
        if (feature.properties.ACT) { //GENER_TYPE == '1') {
            return true;
        } else {
            return false;
        }
    }


    var _symStyles = [_polyInterest];
    var _symPoints = [];
    
    var _popupFilters = function (layer) {
        if (layer.feature.properties.ACT) {
            if ((layer.feature.properties.LABEL ? layer.feature.properties.LABEL : " ") == " ") {
                return layer.feature.properties.NAME;
            } else {
                return layer.feature.properties.LABEL;
            }
        }
        return "Public Land";
    }

    // main layout and popups

    var commonStyling = {
        applyStyles: _symStyles,
        applyPoints: _symPoints,
        applyPopups: _popupFilters,
        zIndex: 5
    };

    layerParameters.typeName = 'datavic:CROWNLAND_PLM25_H_A_C_FEAT_RES';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getGeojson(URL, mymap, commonStyling, false, "Historical");
    layerParameters.typeName = 'datavic:CROWNLAND_PLM25_COMM_USE_AREA';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getGeojson(URL, mymap, commonStyling, false, "Community");

    // layerParameters.typeName = 'datavic:CROWNLAND_PLM25_FOREST_PARK';
    // URL = rootUrl + L.Util.getParamString(layerParameters);
    // getGeojson(URL, mymap, commonStyling, false, "Forest parks");

    layerParameters.typeName = 'datavic:CROWNLAND_PLM25_NATURAL_FEAT';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getGeojson(URL, mymap, commonStyling, false, "Landscape");
    layerParameters.typeName = 'datavic:CROWNLAND_PLM25_NATURE_CONSERV';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getGeojson(URL, mymap, commonStyling, false, "Conservation");

    // layerParameters.typeName = 'datavic:CROWNLAND_PLM25_ALPINE_RESORT';
    // URL = rootUrl + L.Util.getParamString(layerParameters);
    // getGeojson(URL, mymap, commonStyling, false, "Resorts");

    layerParameters.typeName = 'datavic:CROWNLAND_PLM25_COASTAL_RES';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getGeojson(URL, mymap, commonStyling, false, "Coastal");

}

