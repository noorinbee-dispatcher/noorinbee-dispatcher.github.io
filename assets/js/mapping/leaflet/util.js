
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
        lat:(_globalMap.getCenter().lat),
        lng:(_globalMap.getCenter().lng) ,
        zoom:(_globalMap.getZoom()),
          sel:getOverlays()
            })
    );

}
