

function pageLaunch(launchSpec) {

  if (typeof (launchSpec.map) == 'undefined' || !launchSpec.map) {
    launchSpec.map = "{}";
  }
  try {
    launchSpec = JSON.parse(launchSpec.map.replace('\\', ""));
  } catch (e) {
    launchSpev = {};
  }

  mymap = buildCustomMap('lf-map', 'legend', launchSpec);

  buildCustomInterests(mymap);
  buildCustomRoutes(mymap);
  buildCustomAreas(mymap);
  buildCustomActivities(mymap);
  buildCustomBiome(mymap);
  buildCustomRoads(mymap);
  buildCustomContours(mymap);
}

