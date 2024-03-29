

var dstart = new Date();
dstart.setDate(dstart.getDate() - 45);
var dfinish = new Date();
dfinish.setDate(dfinish.getDate() + 500);

dstart = dstart.toISOString().slice(0, 10).replace(/-/g, "");
var dstr1 = dstart.substr(0, 4) + '-' + dstart.substr(4, 2) + '-' + dstart.substr(6, 2);
dfinish = dfinish.toISOString().slice(0, 10).replace(/-/g, "");
var dstr2 = dfinish.substr(0, 4) + '-' + dfinish.substr(4, 2) + '-' + dfinish.substr(6, 2);

var url = 'https://api.vic.gov.au:443/vicgov/v2.0/dates?' 
    + 'type=PUBLIC_HOLIDAY%2CDAYLIGHT_SAVING%2CSCHOOL_TERM%2CSCHOOL_HOLIDAY'
    + '&from_date=' + dstr1
    + '&to_date=' + dstr2
    + '&format=json'
    + '&limit=800'
    + '&sort=date:asc';

function pageLaunch() {
    fetcherise(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "apikey": "66d78397-09c8-4946-8b98-a348804a8040"         }
    }, function (response) {
        response.json().then(function (dat) {

            var target = document.querySelectorAll(".termdays-list")[0];
            var tbl = document.createElement("table");
            target.appendChild(tbl);
            for (i = 0; i < dat['dates'].length; i++) {

                var row = document.createElement("tr");
                var c1 = document.createElement("td");
                var c2 = document.createElement("td");
                var c3 = document.createElement("td");
                var dt = dat['dates'][i]['date'];
                var nm = dat['dates'][i]['name'];
                var tp = dat['dates'][i]['type'];
                c1.innerText = dt;
                c2.innerText = nm;
                tp = tp.replace("_", " ");
                tp = tp.charAt(0).toUpperCase() + tp.slice(1).toLowerCase();
                c3.innerText = tp;
                tbl.appendChild(row);
                row.appendChild(c1);
                row.appendChild(c2);
                row.appendChild(c3);

            }

        });
    });
}