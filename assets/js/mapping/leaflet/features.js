
function buildCustomGeography() {
    
    var URL = "";
    var layerParameters = getGeneralLayerQuery();

    var rootUrl = 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs?';

    var _symGreendot = {
        symbology: {
            radius: 4,
            fillColor: "#6AF880",
            color: "#4AcF68",
            weight: 3,
            opacity: 1,
            fillOpacity: 0.25,
        },
        _symFilter: function (feature) { return "Waterfall"; }
    };

    var _popupFalls = function (layer) {
        if (layer.feature.properties.NAME) {
            return layer.feature.properties.NAME;
        }
        return "Waterfalls";
    };

    layerParameters.typeName = 'datavic:VMHYDRO_WATERFALL';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getWFS(URL, mymap, [], [_symGreendot], _popupFalls, false, "Waterfalls");
    
}