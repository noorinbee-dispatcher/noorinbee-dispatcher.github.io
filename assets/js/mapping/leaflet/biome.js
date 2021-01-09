

var biomeLayers = new pannedLayerSet();

function buildCustomBiome(mymap) {

    // biomeLayers.isInZoomRange = function () {
    //     return true;
    // }
    biomeLayers.zoomSnap=10;
    
    biomeLayers.buildLayeredSet =
        function () {

            var URL = "";
            var layerParameters = this.getBoundedRequest(0.9);

            var rootUrl = 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs';

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

            // var forestTitle = "Mature Forest";
            // var forestShown = (getOverlays()[forestTitle] == true);

            layerParameters.typeName = 'datavic:FORESTS_OG100_OGONLY';
            URL = rootUrl + L.Util.getParamString(layerParameters);
            this.getControlledPannedLayer("Mature Forest", URL, forestStyling);
            // getGeojson(URL, mymap, forestStyling, forestShown, forestTitle, null, this.waitOnLayer("biomeMature"));

            /////////////////////

            var _polyRainForest = {
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
                "Rain Forest", { marker: "block", options: _polyRainForest.symbology }
            );

            var _popupRainForest = function (layer) {
                if (layer.feature.properties.BIOREGION) {
                    return layer.feature.properties.BIOREGION + " - "
                        + layer.feature.properties.X_EVCNAME;
                }
                return "Rain forest";
            };

            var rainForestStyling = {
                applyStyles: [_polyRainForest],
                applyPoints: [],
                applyPopups: _popupRainForest,
                zIndex: 5
            };

            // var wetForestTitle = "Rain Forest";
            // var wetForestShown = (getOverlays()[wetForestTitle] == true);

            layerParameters.typeName = 'FLORAFAUNA1_NV2005_EVCBCS_9_1';
            URL = rootUrl + L.Util.getParamString(layerParameters);
            this.getControlledPannedLayer("Rain Forest", URL, rainForestStyling);
            // getGeojson(URL, mymap, wetForestStyling, wetForestShown, wetForestTitle, null, this.waitOnLayer("biomeRainForest"));

            /////////////////////

            var _polyWetForest = {
                symbology: {
                    fillColor: "#439c60", //EAAFD8",
                    color: "#41a264", //FAEFA8",
                    weight: .5,
                    opacity: 1,
                    fillOpacity: 0.5,
                },
                _symFilter: function (feature) { return true; }
            };

            legendStyle(
                "Damp Condition Forest", { marker: "block", options: _polyWetForest.symbology }
            );

            var _popupWetForest = function (layer) {
                if (layer.feature.properties.BIOREGION) {
                    return layer.feature.properties.BIOREGION + " - "
                        + layer.feature.properties.X_EVCNAME;
                }
                return "Forest";
            };

            var wetForestStyling = {
                applyStyles: [_polyWetForest],
                applyPoints: [],
                applyPopups: _popupWetForest,
                zIndex: 5
            };

            // var wetForestTitle = "Rain Forest";
            // var wetForestShown = (getOverlays()[wetForestTitle] == true);

            layerParameters.typeName = 'datavic:FLORAFAUNA1_NV2005_EVCBCS_8_2';
            layerParameters.typeName += ',datavic:FLORAFAUNA1_NV2005_EVCBCS_7_2';
            layerParameters.typeName += ',datavic:FLORAFAUNA1_NV2005_EVCBCS_7_1';
            URL = rootUrl + L.Util.getParamString(layerParameters);
            this.getControlledPannedLayer("Damp Condition Forest", URL, wetForestStyling);
            // getGeojson(URL, mymap, wetForestStyling, wetForestShown, wetForestTitle, null, this.waitOnLayer("biomeRainForest"));

            /////////////////////////////////////////////////////

        }

    biomeLayers.attachSet(mymap);
}
//datavic:VMVEG_TREE_DENSITY_DENSE

/*

<Name>datavic:FLORAFAUNA1_NV2005_EVCBCS_13_1</Name>
<Title>
Plains Woodlands or Forests - Freely-draining - Native Vegetation (EVCBCS_2005)
</Title>

<Name>datavic:FLORAFAUNA1_NV2005_EVCBCS_8_2</Name>
<Title>
Riparian Forests or Woodlands - Native Vegetation (EVCBCS_1750)
</Title>

<Name>datavic:FLORAFAUNA1_NV2005_EVCBCS_7_2</Name>
<Title>
Wet or Damp Forests - Damp - Native Vegetation (EVCBCS_2005)
</Title>
<Name>datavic:FLORAFAUNA1_NV2005_EVCBCS_7_1</Name>
<Title>
Wet or Damp Forests - Wet - Native Vegetation (EVCBCS_2005)
</Title>

*/