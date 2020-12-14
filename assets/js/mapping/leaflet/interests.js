
function buildCustomInterests(mymap) {

    // recweb & public areas:

    var URL = "";
    var layerParameters = getGeneralLayerQuery();

    var rootUrl = 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs?';

    var _polyInterest = getMainPolyStyle();
    var _symInterest = getMainPointStyle();
    var _symObject = getMinorPointStyle();

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

    _symInterest._symFilter = function (feature) {
        if (
            (feature.properties.FAC_TYPE == "REC SITES") 
            ||(feature.properties.PARK_ID > 0)
        ) {
            return "Recreation and Nature";
        }
        return null;
    }

    _symObject._symFilter = function (feature) {
        var generalDescriptor = "Installed Structure";
        if (feature.properties.ASSET_CLS !== 'SITE ELEMENT' ||
            feature.properties.CATEGORY == 'Gate' ||
            feature.properties.CATEGORY == 'Bench - Seat') {
            return generalDescriptor;
        }
        var structures = [
            'PICNIC SHELTER',
            'TOILET BLOCK',
            'VIEWING PLATFORM',
            'JETTY',
            'INFORMATION SHELTER',
        ];
        classed = feature.properties.ASSET_CLS;
        if (
            (classed && structures.includes(classed))
        ) {
            return generalDescriptor;
        }
        return null;
    }

    var _symStyles = [_polyInterest];
    var _symPoints = [_symInterest, _symObject];
    
    var _popupFilters = function (layer) {
        if (layer.feature.properties.ACT) {
            if ((layer.feature.properties.LABEL ? layer.feature.properties.LABEL : " ") == " ") {
                return layer.feature.properties.NAME;
            } else {
                return layer.feature.properties.LABEL;
            }
        }
        if (layer.feature.properties.FAC_TYPE == "REC SITES") {
            captioned = layer.feature.properties.LABEL ? layer.feature.properties.LABEL : "Site of interest.";
            detailed = layer.feature.properties.COMMENTS ? layer.feature.properties.COMMENTS : "";
            if (captioned && detailed) {
                captioned += " - " + detailed;
            }
            return captioned;
        }
        if (layer.feature.properties.ASSET_CLS == 'SITE ELEMENT' &&
            (layer.feature.properties.CATEGORY == 'Gate' ||
                layer.feature.properties.CATEGORY == 'Bench - Seat')) {
            return layer.feature.properties.CATEGORY;
        }
        if (layer.feature.properties.PARK_ID > 0) {
            return layer.feature.properties.ASSET_DESC + " - "
                + layer.feature.properties.PARK_NAME;
        }
        return layer.feature.properties.ASSET_CLS;
    }

    // main layout and popups

    layerParameters.typeName = 'datavic:FORESTS_RECWEB_ASSET';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getWFS(URL, mymap, _symStyles, _symPoints, _popupFilters);
    layerParameters.typeName = 'datavic:FORESTS_RECWEB_SITE';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getWFS(URL, mymap, _symStyles, _symPoints, _popupFilters);


    URL = 'assets/data/geo/camps_sp_4283.geojson';
    getWFS(URL, mymap, _symStyles, _symPoints, _popupFilters);
    URL = 'assets/data/geo/huts_sp_4283.geojson';
    getWFS(URL, mymap, _symStyles, _symPoints, _popupFilters);
    //forests RECWEBHUTS???


    layerParameters.typeName = 'datavic:CROWNLAND_PLM25_H_A_C_FEAT_RES';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getWFS(URL, mymap, _symStyles, _symPoints, _popupFilters, false, "Historical");
    layerParameters.typeName = 'datavic:CROWNLAND_PLM25_COMM_USE_AREA';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getWFS(URL, mymap, _symStyles, _symPoints, _popupFilters, false, "Community");

    layerParameters.typeName = 'datavic:CROWNLAND_PLM25_FOREST_PARK';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getWFS(URL, mymap, _symStyles, _symPoints, _popupFilters, false, "Forest parks");

    layerParameters.typeName = 'datavic:CROWNLAND_PLM25_NATURAL_FEAT';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getWFS(URL, mymap, _symStyles, _symPoints, _popupFilters, false, "Landscape");
    layerParameters.typeName = 'datavic:CROWNLAND_PLM25_NATURE_CONSERV';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getWFS(URL, mymap, _symStyles, _symPoints, _popupFilters, false, "Conservation");

    layerParameters.typeName = 'datavic:CROWNLAND_PLM25_ALPINE_RESORT';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getWFS(URL, mymap, _symStyles, _symPoints, _popupFilters, false, "Resorts");

    layerParameters.typeName = 'datavic:CROWNLAND_PLM25_COASTAL_RES';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getWFS(URL, mymap, _symStyles, _symPoints, _popupFilters, false, "Coastal");

}

