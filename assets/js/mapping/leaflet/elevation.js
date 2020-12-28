

function buildCustomContours(mymap) {
    var contourLayers = new pannedLayerSet();
    contourLayers.zoomSnap = 13;

    contourLayers.buildLayeredSet =
        function () {

            var URL = "";
            var layerParameters = getGeneralLayerQuery();
            layerParameters.bbox = toLatLngBBoxString(hangEdges(mymap.getBounds(), 1.15));
            var rootUrl = 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs?';

            var _elevationLinework = getAltLineStyle();
            _elevationLinework.symbology.dashArray = '0.75, 5.5';
            _elevationLinework.symbology.weight=1.5;
            _elevationLinework.symbology.color="#b6bab9";
            var _popupContours = function (layer) {
                return "Altitude:<br>"+layer.feature.properties.ALTITUDE+"m";
            }
            var lineStyling = {
                applyStyles: [_elevationLinework],
                applyPoints: [],
                applyPopups: _popupContours,
                zIndex: 4
            };
            layerParameters.typeName = 'datavic:VMELEV_EL_CONTOUR';
            URL = rootUrl + L.Util.getParamString(layerParameters);
            getGeojson(URL, mymap, lineStyling, false, null, null, this.waitOnLayer("25kElevation"));
        }

    contourLayers.attachSet(mymap);

}