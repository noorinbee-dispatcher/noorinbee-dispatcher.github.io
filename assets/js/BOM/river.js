

// see: http://www.bom.gov.au/australia/meteye/search.php?q=
var regions = [
    {
        link: "http://www.bom.gov.au/fwo/IDV67202/IDV67202.584029.png",
        name: "Cann R U/S Cann R Offtake"
    },
    {
        link: "http://www.bom.gov.au/fwo/IDV67202/IDV67202.084128.png",
        name: "Cann R at Chandlers Ck"
    },
    {
        link: "http://www.bom.gov.au/fwo/IDV67202/IDV67202.084127.png",
        name: "Cann R at Weeragua"
    },
    {
        link: "http://www.bom.gov.au/fwo/IDV67202/IDV67202.584026.png",
        name: "Bemm R at Princes Highway"
    },
    {
        link: "http://www.bom.gov.au/fwo/IDV67202/IDV67202.584028.png",
        name: "Bemm R U/S of Pumphouse"
    },
    {
        link: "http://www.bom.gov.au/fwo/IDV67202/IDV67202.584007.png",
        name: "Genoa R at The Gorge"
    },
    {
        link: "http://www.bom.gov.au/fwo/IDV67202/IDV67202.584011.png",
        name: "Snowy R at Orbost"
    },
    {
        link: "http://www.bom.gov.au/fwo/IDV67202/IDV67202.584027.png",
        name: "Brodribb R at Sardine Ck"
    },
    {
        link: "http://www.bom.gov.au/fwo/IDV67202/IDV67202.084126.png",
        name: "Snowy R at McKillops Bridge"
    },
    {
        link: "http://www.bom.gov.au/fwo/IDV67202/IDV67202.570020.png",
        name: "Bombala R at Bombala"
    },
];

var target = document.querySelectorAll(".region-list")[0];
var ext = "http://www.bom.gov.au/vic/flood/east_gippsland.shtml";

for (i = 0; i < regions.length; i++) {
    var ref = document.createElement("a");
    var txt = document.createElement("span");
    var holder = document.createElement("div");
    var panel = document.createElement("img");

    panel.setAttribute("src", _globalHTTPS + regions[i]['link']);
    ref.setAttribute("href", ext);
    ref.setAttribute("target", "_blank");
    txt.innerHTML = regions[i]['name'];

    target.appendChild(holder);
    holder.appendChild(ref);
    ref.appendChild(panel);
    ref.appendChild(txt);
};
