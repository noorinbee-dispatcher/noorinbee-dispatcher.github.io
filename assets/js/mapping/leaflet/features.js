
function buildCustomGeography() {
    
    var URL = "";
    var layerParameters = getGeneralLayerQuery();

    var rootUrl = 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs';

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
    
    var waterfallStyling = {
        applyStyles: [],
        applyPoints: [_symGreendot],
        applyPopups: _popupFalls,
        zIndex: 5
    };
    layerParameters.typeName = 'datavic:VMHYDRO_WATERFALL';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getGeojson(URL, mymap, waterfallStyling, false, "Waterfalls");


    
    var _symReddot = {
        symbology: {
            radius: 4,
            fillColor: "#fc030b",
            color: "#fc030b",
            weight: 3,
            opacity: 1,
            fillOpacity: 0.85,
        },
        _symFilter: function (feature) { return "RedThings"; }
    };

    var _popupRed = function (layer) {
        if (true==true){//layer.feature.properties.NAME) {
            return layer.feature.properties.LITHO_GRAD
            +"<br>"+layer.feature.properties.LITHO_DESC
            +"<br>"+layer.feature.properties.STRATNAME;
        }
        return "RedThings";
    };
    
    var reddotStyling = {
        applyStyles: [],
        applyPoints: [_symReddot],
        applyPopups: _popupRed,
        zIndex: 25
    };
    
    layerParameters.typeName = 'datavic:MINERALS_MINHST';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getGeojson(URL, mymap, reddotStyling, false, "RedThings");
        //datavic:MINERALS_SHAFT = has names!
        //datavic:MINERALS_MINERALP NAME, COMMDSC, RESCLADF <--assays?
        //datavic:MINERALS_ROCKS LITHO_GRAD, LITHO_DESC, STRATNAME
        //datavic:MINERALS_MINSITE MINE_NAME, PRI_COMM, MININGMETH
        //datavic:MINERALS_SPRINGS X
        //datavic:MINERALS_SITES X
        //datavic:MINERALS_FOSSILS X
        //datavic:MINERALS_OUTCROP X
        //datavic:MINERALS_NUGGET X
        //datavic:MINERALS_ERUPTION_PTS X
        //datavic:MINERALS_SIGFEAT ?
        //datavic:MINERALS_GMLHST <--POLY!
        //datavic:MINERALS_MINHST <--POLY!

}