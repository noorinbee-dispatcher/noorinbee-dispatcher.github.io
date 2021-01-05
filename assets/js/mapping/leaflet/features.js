
var activityLayers = new pannedLayerSet();

function buildCustomActivities(mymap) {

    activityLayers.isInZoomRange = function () {
        return true;
    }

    activityLayers.buildLayeredSet =
        function () {
    
    var URL = "";
    var layerParameters = this.getBoundedRequest(1.1); //getGeneralLayerQuery();

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
    // getGeojson(URL, mymap, waterfallStyling, false, "Waterfalls");
    this.getControlledPannedLayer("Waterfalls", URL, waterfallStyling);
    
    var _symProspect = {
        symbology: {
            radius: 5.25,
            fillColor: "#fade4b",
            color: "#fc030b",
            weight: 1.25,
            opacity: 0.5,
            fillOpacity: 0.75,
        },
        _symFilter: function (feature) { 
            if(!feature.properties.ROCK_NO) {
                return "Mining Site";
             }
             return null;
            }
    };
    var _symRockType = {
        symbology: {
            radius: 2.5,
            fillColor: "#ad8549",
            color: "#d9454f",
            weight: 0.75,
            opacity: 0.75,
            fillOpacity: 0.5,
        },
        _symFilter: function (feature) { return "Rock Type"; }
    };

    var _popupRockFossick = function (layer) {
        if (layer.feature.properties.NAME){
            return "Commodity: " + layer.feature.properties.COMMDSC
            +"<br>"+layer.feature.properties.NAME;
        }
        if (layer.feature.properties.PRI_COMM){
            return layer.feature.properties.MINE_NAME + " (mine)"
            +"<br>"+layer.feature.properties.PRI_COMM
            +" "+layer.feature.properties.MININGMETH;
        }
        if (layer.feature.properties.ROCK_NO){
            var tagged = "Rock sampled: ";
            var located = "";
            if(layer.feature.properties.LOCDESC
                && layer.feature.properties.LOCDESC!==" "
                ) {
                located = "<br>("+layer.feature.properties.LOCDESC+")";
            }
            if(layer.feature.properties.LITHO_DESC
                && layer.feature.properties.LITHO_DESC!==" "
                ) {
                return tagged +layer.feature.properties.LITHO_DESC+located
            }
            if(layer.feature.properties.MINERAL
                && layer.feature.properties.MINERAL!==" "
                ) {
                return tagged +layer.feature.properties.MINERAL+located
            }
            if(layer.feature.properties.LITHO_GRAD
                && layer.feature.properties.LITHO_GRAD!==" "
                ) {
                return tagged +layer.feature.properties.LITHO_GRAD+located
            }
            if(layer.feature.properties.STRATNAME
                && layer.feature.properties.STRATNAME!==" "
                ) {
                return tagged +layer.feature.properties.STRATNAME+located
            }
            if(layer.feature.properties.LOCDESC
                && layer.feature.properties.LOCDESC!==" "
                ) {
                return tagged +layer.feature.properties.LOCDESC
            }
            if(layer.feature.properties.FIELD_BOOK
                && layer.feature.properties.FIELD_BOOK!==" "
                ) {
                return tagged +layer.feature.properties.FIELD_BOOK+located
            }
        }
        return "Mineral site"
    };
    
    var mineralStyling = {
        applyStyles: [],
        applyPoints: [_symProspect, _symRockType],
        applyPopups: _popupRockFossick,
        zIndex: 25
    };
    
    layerParameters.typeName = 'datavic:MINERALS_MINERALP';
    layerParameters.typeName += ',datavic:MINERALS_MINSITE';
    layerParameters.typeName += ',datavic:MINERALS_ROCKS';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    // getGeojson(URL, mymap, reddotStyling, false, "RedThings");
    this.getControlledPannedLayer("Fossicking", URL, mineralStyling);
        //datavic:MINERALS_SHAFT = has names!
        //datavic:MINERALS_MINERALP NAME, COMMDSC, RESCLADF <--assays?
        //datavic:MINERALS_ROCKS  LITHO_DESC, MINERAL, LITHO_GRAD, STRATNAME, LOCDESC
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

        activityLayers.attachSet(mymap);
}