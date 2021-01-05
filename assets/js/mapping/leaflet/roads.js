

function buildCustomRoads(mymap) {
    var roadLayers = new pannedLayerSet();

    roadLayers.buildLayeredSet =
        function () {

            var URL = "";
            var layerParameters = this.getBoundedRequest(1.15);
            var rootUrl = 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wfs';

            var _trackLinework = getAltLineStyle();
            var _popupTransMinor = function (layer) {
                var ezi = (layer.feature.properties.EZI_ROAD_NAME_LABEL == "Unnamed")
                    ? "Minor Road" : layer.feature.properties.EZI_ROAD_NAME_LABEL;
                return ezi;
            }
            var trackStyling = {
                applyStyles: [_trackLinework],
                applyPoints: [],
                applyPopups: _popupTransMinor,
                zIndex: 5
            };
            layerParameters.typeName = 'datavic:VMTRANS_TR_ROAD_TRACKS';
            URL = rootUrl + L.Util.getParamString(layerParameters);
            this.getAutoPannedLayer("roadTracks",URL,trackStyling);
            // getGeojson(URL, mymap, trackStyling, false, null, null, this.waitOnLayer("roadTracks"));


            var _fwdLinework = getAltLineStyle();
            _fwdLinework.symbology.dashArray = '7.5, 6.25';
            var _popupTransFwd = function (layer) {
                var ezi = (layer.feature.properties.EZI_ROAD_NAME_LABEL == "Unnamed")
                    ? null : layer.feature.properties.EZI_ROAD_NAME_LABEL + " (4wd)";
                ezi = (ezi ? ezi : "4wd: " + layer.feature.properties.LEFT_LOCALITY);
                return ezi ? ezi : "4wd: " + layer.feature.properties.RIGHT_LOCALITY;
            }
            var fwdStyling = {
                applyStyles: [_fwdLinework],
                applyPoints: [],
                applyPopups: _popupTransFwd,
                zIndex: 1
            };
            layerParameters.typeName = 'datavic:VMTRANS_TR_ROAD_4WD';
            URL = rootUrl + L.Util.getParamString(layerParameters);
            this.getAutoPannedLayer("roadsFwd",URL,fwdStyling);
            // getGeojson(URL, mymap, fwdStyling, false, null, null, this.waitOnLayer("roadsFwd"));


            var _closedLinework = getAltLineStyle();
            _closedLinework.symbology.color = "#eef0a5";//"#ecf720";
            _closedLinework.symbology.weight = 1.75;
            _closedLinework.symbology.dashArray = '6, 3.5';
            var _popupTransClosed = function (layer) {
                var ezi = (layer.feature.properties.EZI_ROAD_NAME_LABEL == "Unnamed")
                    ? null : layer.feature.properties.EZI_ROAD_NAME_LABEL + "<br>(Unmaintained)";
                ezi = (ezi ? ezi : "Unmaintained:<br>" + layer.feature.properties.LEFT_LOCALITY);
                return ezi ? ezi : "Unmaintained:<br>" + layer.feature.properties.RIGHT_LOCALITY;
            }
            var closedStyling = {
                applyStyles: [_closedLinework],
                applyPoints: [],
                applyPopups: _popupTransClosed,
                zIndex: 4
            };
            layerParameters.typeName = 'datavic:VMTRANS_TR_ROAD_UNMAINTAINED';
            layerParameters.typeName += ',datavic:VMTRANS_TR_ROAD_CLOSED';
            URL = rootUrl + L.Util.getParamString(layerParameters);
            this.getAutoPannedLayer("roadsBlocked",URL,closedStyling);
            // getGeojson(URL, mymap, closedStyling, false, null, null, this.waitOnLayer("roadsBlocked"));

            //private
            //management
            //seasonal
            var _privateLinework = getAltLineStyle();
            _privateLinework.symbology.color = "#ebc7e8";
            _privateLinework.symbology.weight = 1.75;
            var _popupTransPrivate = function (layer) {
                var ezi = (layer.feature.properties.EZI_ROAD_NAME_LABEL == "Unnamed")
                    ? null : layer.feature.properties.EZI_ROAD_NAME_LABEL + "<br>(Limited access)";
                ezi = (ezi ? ezi : "Not public:<br>" + layer.feature.properties.LEFT_LOCALITY);
                return ezi ? ezi : "Not public:<br>" + layer.feature.properties.RIGHT_LOCALITY;
            }
            var privateStyling = {
                applyStyles: [_privateLinework],
                applyPoints: [],
                applyPopups: _popupTransPrivate,
                zIndex: 4
            };
            layerParameters.typeName = 'datavic:VMTRANS_TR_ROAD_MANAGEMENT_VEHICLES';
            layerParameters.typeName += ',datavic:VMTRANS_TR_ROAD_PRIVATE';
            layerParameters.typeName += ',datavic:VMTRANS_TR_ROAD_SEASONAL';
            URL = rootUrl + L.Util.getParamString(layerParameters);
            this.getAutoPannedLayer("roadsLimited",URL,privateStyling);
            // getGeojson(URL, mymap, privateStyling, false, null, null, this.waitOnLayer("roadsLimited"));

            //collector & local
            var _coreLinework = getAltLineStyle();
            _coreLinework.symbology.color = "#ad4805";
            _coreLinework.symbology.weight = 2;
            var _popupTransLocal = function (layer) {
                var ezi = (layer.feature.properties.EZI_ROAD_NAME_LABEL == "Unnamed")
                    ? null : layer.feature.properties.EZI_ROAD_NAME_LABEL;
                ezi = (ezi ? ezi : "Road: " + layer.feature.properties.LEFT_LOCALITY);
                return ezi ? ezi : "Road: " + layer.feature.properties.RIGHT_LOCALITY;
            }
            var coreStyling = {
                applyStyles: [_coreLinework],
                applyPoints: [],
                applyPopups: _popupTransLocal,
                zIndex: 4
            };
            layerParameters.typeName = 'datavic:VMTRANS_TR_ROAD_COLLECTOR';
            layerParameters.typeName += ',datavic:VMTRANS_TR_ROAD_LOCAL';
            URL = rootUrl + L.Util.getParamString(layerParameters);
            this.getAutoPannedLayer("roadsCore",URL,coreStyling);
            // getGeojson(URL, mymap, coreStyling, false, null, null, this.waitOnLayer("roadsCore"));

        //highway arterial sub arterial
        var _majorLinework = getAltLineStyle();
        _majorLinework.symbology.color = "#d9c750";
        _majorLinework.symbology.weight = 2.75;
        var _popupTransMajor = function (layer) {
            var ezi = (layer.feature.properties.EZI_ROAD_NAME_LABEL == "Unnamed")
                ? null : layer.feature.properties.EZI_ROAD_NAME_LABEL;
            ezi = (ezi ? ezi : "Main Road: " + layer.feature.properties.LEFT_LOCALITY);
            return ezi ? ezi : "Main Road: " + layer.feature.properties.RIGHT_LOCALITY;
        }
        var majorStyling = {
            applyStyles: [_majorLinework],
            applyPoints: [],
            applyPopups: _popupTransMajor,
            zIndex: 4
        };
        layerParameters.typeName = 'datavic:VMTRANS_TR_ROAD_ARTERIAL';
        layerParameters.typeName += ',datavic:VMTRANS_TR_ROAD_SUB_A';
        layerParameters.typeName += ',datavic:VMTRANS_TR_ROAD_HIGHWAY';
        URL = rootUrl + L.Util.getParamString(layerParameters);
        this.getAutoPannedLayer("roadsMajor",URL,majorStyling);
        // getGeojson(URL, mymap, majorStyling, false, null, null, this.waitOnLayer("roadsMajor"));

    }

        
    roadLayers.attachSet(mymap);
}