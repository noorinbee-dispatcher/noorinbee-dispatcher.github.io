

var contourLayers = new pannedLayerSet();

function buildCustomContours(mymap) {
    contourLayers.zoomSnap = 14;

    var _elevationLinework = getAltLineStyle();
    _elevationLinework.symbology.dashArray = '0.75, 5.5';
    _elevationLinework.symbology.weight = 1.5;
    _elevationLinework.symbology.color = "#c4c0cf";

    var _popupContours = function (layer) {
        return "Altitude:<br>" + layer.feature.properties.ALTITUDE + "m";
    }

    contourLayers.symStaggered = {};
    Object.assign(contourLayers.symStaggered, _elevationLinework.symbology);
    contourLayers.symStaggered.dashOffset = 3.125;
    contourLayers.symStaggered.color = "#4a3c3d";

    contourLayers.waitOnLayer = function (layer) {
        this._setIsLoading = true;
        this._setStack[layer] = { loaded: false, layer: null };
        this._setStack["staggered"] = { loaded: false, layer: null };

        var self = this;
        var addLayerToSet = function (lyr) {
            self._setStack[layer].loaded = true;
            self._setStack[layer].layer = lyr;
            self._setStack["staggered"].loaded = true;
            var stg = L.geoJson(lyr.toGeoJSON(), {
                style: function (feature) {
                    return self.symStaggered;
                }
            }).bindPopup(function (layer) {
                return _popupContours(layer);
            }, { autoClose: false, closeOnClick: false });
            self._setStack["staggered"].layer = stg;
            self.builtSetCallback(self);
        };

        return addLayerToSet;
    }

    contourLayers.buildLayeredSet =
        function () {

            var URL = "";
            var layerParameters = this.getBoundedRequest(1);
            var rootUrl = 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs';

            var lineStyling = {
                applyStyles: [_elevationLinework],
                applyPoints: [],
                applyPopups: _popupContours,
                zIndex: 4
            };
            layerParameters.typeName = 'datavic:VMELEV_EL_CONTOUR';
            URL = rootUrl + L.Util.getParamString(layerParameters);

            this.getAutoPannedLayer("25kElevation", URL, lineStyling);
            // getGeojson(URL, mymap, lineStyling, false, null, null, this.waitOnLayer("25kElevation"));
        }

    contourLayers.attachSet(mymap);

}