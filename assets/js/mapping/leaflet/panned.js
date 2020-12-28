

function pannedLayerSet() {

    this._holdSet = [];
    this._setIsLoading = false;
    this._setStack = {};
    this.onmap = null;

    this.zoomSnap = 12;

}

pannedLayerSet.prototype.attachSet = function (mymap) {
    this.onmap = mymap;
    this.buildCustomSet();
}

pannedLayerSet.prototype.buildCustomSet = function () {
    var self = this;
    self.applySetLoader();
    self.onmap.on('zoomend', function (e) {
        self.applySetLoader();
    });
    self.onmap.on('moveend', function (e) {
        if (self._holdSet.length>0 && !self._setIsLoading) {
            self.buildLayeredSet();
        }
    });
}

pannedLayerSet.prototype.applySetLoader = function () {
    if ((this.onmap.getZoom() <= this.zoomSnap) && this._holdSet) {
        this.dropSet();
        // this._holdSet = [];
        return;
    }
    if (this.onmap.getZoom() > this.zoomSnap) {
        console.log(this.zoomSnap);
        console.log(this.onmap.getZoom() );
        if ((this._holdSet.length==0) && !this._setIsLoading) {
            this.buildLayeredSet();
        }
    }
}


pannedLayerSet.prototype.dropSet = function () {
    if (!this._holdSet) { return; }
    for (i = 0; i < this._holdSet.length; i++) {
        this.onmap.removeLayer(this._holdSet[i]);
    }
    this._holdSet = [];
}

pannedLayerSet.prototype.showSet = function () {
    for (i = 0; i < this._holdSet.length; i++) {
        this._holdSet[i].addTo(this.onmap);
    }
}


pannedLayerSet.prototype.isSetLoaded = function (self) {
    // console.log(self._setStack);
    var gettingSet = Object.keys(self._setStack);
    for (i = 0; i < gettingSet.length; i++) {
        if (!self._setStack[gettingSet[i]].loaded) {
            return false;
        }
    }
    self._setIsLoading = false;
    return true;
}

pannedLayerSet.prototype.builtSetCallback = function (self) {
    if (!self.isSetLoaded(self)) {
        return false;
    }

    var gotSet = Object.keys(self._setStack);
    self.dropSet();
    for (i = 0; i < gotSet.length; i++) {
        self._holdSet.push(self._setStack[gotSet[i]].layer);
    }
    self.showSet();
    return true;
}

pannedLayerSet.prototype.waitOnLayer = function (layer) {
    this._setIsLoading = true;
    this._setStack[layer] = { loaded: false, layer: null };

    var self = this;
    var addLayerToSet = function (lyr) {
        self._setStack[layer].loaded = true;
        self._setStack[layer].layer = lyr;
        self.builtSetCallback(self);
    };
    // console.log("waitingOn:"+layer);
    return addLayerToSet;
}


pannedLayerSet.prototype.buildLayeredSet = function () {

    //getGeojson(URL, theMap, styleUI, addto, listed, transform, this.waitOnLayer("myLayerToAdd"));

}
