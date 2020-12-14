
function utilSaveMap() {

    var node = document.getElementById('lf-map');
    domtoimage.toBlob(node).then(function (blob) {
        saveAs(blob, 'DispatcherMap.png');
    });
}

function utilMakeLink() {

    alert(
        JSON.stringify(
            {
        mid:JSON.stringify(_globalMap.getCenter()) ,
        zoom:JSON.stringify(_globalMap.getZoom()),
    sel:JSON.stringify(getOverlays())
            })
    );

}
