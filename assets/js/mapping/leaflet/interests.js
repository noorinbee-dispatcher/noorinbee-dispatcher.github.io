
function buildCustomInterests(mymap) {

    // recweb & public areas:

    var URL = "";
    var layerParameters = getGeneralLayerQuery();
    var cqlParameters = {};

    var rootUrl = 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs';

    var _symInterest = getMainPointStyle();
    var _symObject = getMinorPointStyle();

    var explodeMulti = function (multipoint) {
        return turf.explode(multipoint);
    };

    _symInterest._symFilter = function (feature) {
        if (
            (feature.properties.FAC_TYPE == "REC SITES")
            || (feature.properties.PARK_ID >= 0)
            ||  (feature.properties.FEATURE_SUBTYPE)
        ) {
            return "Recreation and Nature";
        }
        if (
            (feature.properties.FEATURE_CODE)
            && feature.properties.FEATURE !== 'JETTY'
            && feature.properties.FEATURE !== 'ROAD BRIDGE'
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

    var _symStyles = [];
    var _symPoints = [_symInterest, _symObject];

    var _popupFilters = function (layer) {
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
        if (layer.feature.properties.PARK_ID >= 0) {
            return layer.feature.properties.ASSET_DESC + " - "
                + (layer.feature.properties.PARK_NAME?layer.feature.properties.PARK_NAME:layer.feature.properties.SITE_NAME);
        }
        if (layer.feature.properties.FEATURE_SUBTYPE) {
            return (layer.feature.properties.NAME_LABEL) ? layer.feature.properties.FEATURE_SUBTYPE + " - " + layer.feature.properties.NAME_LABEL : layer.feature.properties.FEATURE_SUBTYPE;
        }
        if (layer.feature.properties.FEATURE_CODE) {
            return (layer.feature.properties.PLACE_NAME) ? layer.feature.properties.PLACE_NAME : layer.feature.properties.FEATURE;
        }
        console.log(layer.feature.properties);
        return layer.feature.properties.ASSET_CLS;
    }

    // main layout and popups

    var commonStyling = {
        applyStyles: _symStyles,
        applyPoints: _symPoints,
        applyPopups: _popupFilters,
        zIndex: 5
    };
    layerParameters.typeName = 'datavic:FORESTS_RECWEB_ASSET';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getGeojson(URL, mymap, commonStyling);

    commonStyling.zIndex = 10;
    layerParameters.typeName = 'datavic:FORESTS_RECWEB_SITE';
    URL = rootUrl + L.Util.getParamString(layerParameters);
    getGeojson(URL, mymap, commonStyling);


    // FOI - lookout & picnic site & fire lookout & rest area
    // datavic:VMFEAT_FOI_POINT
    commonStyling.zIndex = 10;
    cqlParameters = getCqlLayerQuery(getBboxAsCql());
    cqlParameters.typeName = 'datavic:VMFEAT_FOI_POINT';
    cqlParameters.cql_filter += " and FEATURE_SUBTYPE in ('lookout','picnic site','fire lookout','rest area')";
    URL = rootUrl + L.Util.getParamString(cqlParameters);
    getGeojson(URL, mymap, commonStyling, true, null, explodeMulti);

    commonStyling.zIndex = 5;
    cqlParameters = getCqlLayerQuery("BBOX(SHAPE, -37.853854677977594,148.09321731872052,-36.620632663222686,150.03230420798283)");
    cqlParameters.typeName = 'datavic:VMFEAT_GNR';
    cqlParameters.cql_filter += " and ( FEATURE in ("
        + "'WALKING TRACK', 'WATER TANK', 'CEMETERY', "
        + "'RESERVIOR', 'PARK', 'LOOKOUT','GORGE', "
        + "  'JETTY', 'ROAD BRIDGE')"
        + " or PLACE_NAME in ('ELLERY CAMP', 'DAVIES CAMP') )";
        // , 'CAMP GROUND' 'CLIFF'
    URL = rootUrl + L.Util.getParamString(cqlParameters);
    getGeojson(URL, mymap, commonStyling);


    URL = 'assets/data/geo/camps_sp_4283.geojson';
    getGeojson(URL, mymap, commonStyling);
    URL = 'assets/data/geo/huts_sp_4283.geojson';
    getGeojson(URL, mymap, commonStyling);



}

/*
<FeatureType>
<Name>datavic:VMTRANS_RAIL_STATION_DISUSED</Name>
<Title>
Rail Station (disused) - Rail Network - Vicmap Transport
</Title>
<Abstract/>

*/