

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
    var holder = document.createElement("div");
    var ref = document.createElement("a");
    var panel = document.createElement("img");
    var txt = document.createElement("span");

    holder.setAttribute("style", 'min-width:75%;');
    ref.setAttribute("href", ext);
    ref.setAttribute("target", "_blank");
    panel.setAttribute("src", _globalHTTPS + regions[i]['link']);
    txt.innerHTML = "All details at BOM";

    target.appendChild(holder);
    holder.appendChild(ref);
    ref.appendChild(panel);
    ref.appendChild(txt);
};

