

var contourLayers = new pannedLayerSet();
var hydroLineLayers = new pannedLayerSet();

function buildCustomContours(mymap) {
    contourLayers.zoomSnap = 13;

    contourLayers._elevationLinework = getAltLineStyle();
    contourLayers._elevationLinework.symbology.dashArray = '0.75, 5.5';
    contourLayers._elevationLinework.symbology.weight = 1.5;
    contourLayers._elevationLinework.symbology.color = "#c4c0cf";

    var _popupContours = function (layer) {
        return "Altitude:<br>" + layer.feature.properties.ALTITUDE + "m";
    }

    contourLayers.symStaggered = {};
    Object.assign(contourLayers.symStaggered, contourLayers._elevationLinework.symbology);
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

            var slimline=1;
            if (this.onmap.getZoom()<=(this.zoomSnap +3)) {
                slimline = 1+((this.zoomSnap +3)-this.onmap.getZoom()); 
            }

            this._elevationLinework.symbology.weight = 1.5/slimline;
            this.symStaggered.weight = this._elevationLinework.symbology.weight;

            var lineStyling = {
                applyStyles: [this._elevationLinework],
                applyPoints: [],
                applyPopups: _popupContours,
                zIndex: 2
            };
            layerParameters.typeName = 'datavic:VMELEV_EL_CONTOUR';
            URL = rootUrl + L.Util.getParamString(layerParameters);

            this.getAutoPannedLayer("25kElevation", URL, lineStyling);
            // getGeojson(URL, mymap, lineStyling, false, null, null, this.waitOnLayer("25kElevation"));
        }

    contourLayers.attachSet(mymap);

}

/////////////////////////////////

function buildCustomHydroLines(mymap) {
    var hydroLineLayers = new pannedLayerSet();
    hydroLineLayers.zoomSnap = 12;

    hydroLineLayers.buildLayeredSet =
        function () {

            var URL = "";
            var layerParameters = this.getBoundedRequest(1.15);
            var rootUrl = 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs';
         
            var slimline=1;
            if (this.onmap.getZoom()<=(this.zoomSnap +2)) {
                slimline = 1.25+((this.zoomSnap +2)-this.onmap.getZoom()); 
            }
            
        var _majorLinework = getAltLineStyle();
        _majorLinework.symbology.color = "#66b5d1";
        _majorLinework.symbology.weight = 2.25/slimline;
        
        _majorLinework._symFilter = function (feature) { 
            if(feature.properties.NAMED_FEATURE_ID>0) {
                return "Named Watercourse";
             }
             return null;
            }

            var _minorLinework = getAltLineStyle();
            _minorLinework.symbology.color = "#a7bdc4"; //"#66bce1";
            _minorLinework.symbology.weight = 1/slimline;
            _minorLinework.symbology.dashArray = '1.75, '+(slimline-0.5);//'0.5';
            
            _minorLinework._symFilter = function (feature) { 
                if(!feature.properties.NAMED_FEATURE_ID) {
                    return "Minor Watercourse";
                 }
                 return null;
                }

        var _popupTransMajor = function (layer) {
              if(!layer.feature.properties.NAMED_FEATURE_ID) {
            return "Minor Watercourse";
         }
            // console.log(layer.feature.properties);
            return layer.feature.properties.NAME;
        }
        var majorStyling = {
            applyStyles: [_majorLinework,_minorLinework],
            applyPoints: [],
            applyPopups: _popupTransMajor,
            zIndex: 3
        };
        layerParameters.typeName = 'datavic:VMHYDRO_HY_WATERCOURSE';
        URL = rootUrl + L.Util.getParamString(layerParameters);
        this.getAutoPannedLayer("hydroLines",URL,majorStyling);
    }  
    hydroLineLayers.attachSet(mymap);
}