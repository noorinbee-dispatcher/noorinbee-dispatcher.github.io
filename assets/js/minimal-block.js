// build stage

function panelView() {
    var hideClass = document.querySelectorAll("#root")[0];
    hideClass.classList.toggle("flip-off"); //.style.display = "none";
    var maxClass = document.querySelectorAll("#top")[0];
    maxClass.classList.toggle("flip-wide"); //style.width = "98%";
    var flipClass = document.querySelectorAll("#t1")[0];
    flipClass.classList.toggle("flip-off"); //.style.display = "block";
}

function wideView() {
    var hideClass = document.querySelectorAll("#root")[0];
    hideClass.classList.toggle("flip-off"); //.style.display = "block";
    var maxClass = document.querySelectorAll("#top")[0];
    maxClass.classList.toggle("flip-wide"); //.style.width = "68%";
    var flipClass = document.querySelectorAll("#t1")[0];
    flipClass.classList.toggle("flip-off"); //.style.display = "none";
}

function hideShow(hideclass, showclass) {
    console.log("Show only: " + showclass);
    var hideClasses = document.getElementsByClassName(hideclass);
    var showClass = document.getElementsByClassName(showclass);
    var shown;
    var l = hideClasses.length;
    for (i = 0; i < l; i++) {
        hideClasses[i].style.display = "none";
    };
    var l = showClass.length;
    for (i = 0; i < l; i++) {
        shown = showClass[i];
        shown.style.display = "block";
    };
    return shown;
}