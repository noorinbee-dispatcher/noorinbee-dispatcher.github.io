
function buildCustomDataspaces(mymap) {    
  
  fireImpact=L.tileLayer('https://greyboxdata.github.io/PublicFacing/FireImpact/{z}/{x}/{y}.png', {
    opacity: 0.75,
    minZoom: 8,
    maxZoom: 14,
    tms: false,
  });

  
  _globalControl.addOverlay(fireImpact, "Fire Impact (2019/2020)");

}