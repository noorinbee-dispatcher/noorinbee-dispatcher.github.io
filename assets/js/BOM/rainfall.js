

// see: http://www.bom.gov.au/australia/meteye/search.php?q=
var regions = regions = [
    {
        link: "http://www.bom.gov.au/fwo/IDV65252.gif",
    },
    {
        link: "http://www.bom.gov.au/fwo/IDV65253.gif",
    }
];

var target = document.querySelectorAll(".region-list")[0];
var ext = "http://www.bom.gov.au/vic/flood/east_gippsland.shtml";

for (i = 0; i < regions.length; i++) {
    var ref = document.createElement("a");
    var txt = document.createElement("span");
    var holder = document.createElement("div");
    var panel = document.createElement("img");

    holder.setAttribute("style", 'min-width:75%;');
    panel.setAttribute("src", _globalHTTPS + regions[i]['link']);
    ref.setAttribute("href", ext);
    ref.setAttribute("target", "_blank");
    txt.innerHTML = "All details at BOM";

    target.appendChild(holder);
    holder.appendChild(ref);
    ref.appendChild(panel);
    ref.appendChild(txt);
};

