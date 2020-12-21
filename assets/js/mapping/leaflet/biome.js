
function buildCustomBiome(mymap) {

    var URL = "";
    var layerParameters = getGeneralLayerQuery();

    var rootUrl = 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs?';

    var _polyForest = {
        symbology: {
            fillColor: "#71751e", //EAAFD8",
            color: "#b8db44", //FAEFA8",
            weight: .5,
            opacity: 1,
            fillOpacity: 0.5,
        },
        _symFilter: function (feature) { return true; }
    };

    legendStyle(
        "Mature Forest", { marker: "block", options: _polyForest.symbology }
    );

    var _popupForest = function (layer) {
        if (layer.feature.properties.x_ogdesc) {
            return layer.feature.properties.x_ogdesc + " - "
                + layer.feature.properties.x_ogstudy;
        }
        return "Mature forest";
    };

    var forestStyling = {
        applyStyles: [_polyForest],
        applyPoints: [],
        applyPopups: _popupForest,
        zIndex: 5
    };
    layerParameters.typeName = 'datavic:FORESTS_OG100_OGONLY';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getGeojson(URL, mymap, forestStyling, false, "Mature Forest");

    var _polyWetForest = {
        symbology: {
            fillColor: "#23e833", //EAAFD8",
            color: "#b8db44", //FAEFA8",
            weight: .5,
            opacity: 1,
            fillOpacity: 0.5,
        },
        _symFilter: function (feature) { return true; }
    };

    legendStyle(
        "Rain Forest", { marker: "block", options: _polyWetForest.symbology }
    );

    var _popupWetForest = function (layer) {
        if (layer.feature.properties.BIOREGION) {
            return layer.feature.properties.BIOREGION + " - "
                + layer.feature.properties.X_EVCNAME;
        }
        return "Rain forest";
    };

    var wetForestStyling = {
        applyStyles: [_polyWetForest],
        applyPoints: [],
        applyPopups: _popupWetForest,
        zIndex: 5
    };
    layerParameters.typeName = 'FLORAFAUNA1_NV2005_EVCBCS_9_1';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getGeojson(URL, mymap, wetForestStyling, false, "Rain Forest");

}

