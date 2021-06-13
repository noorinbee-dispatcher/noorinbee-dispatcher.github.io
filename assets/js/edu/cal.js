

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
            "apikey": "fec2e8c1-bad8-4b2e-965b-a0a648db7861",
            // value="fec2e8c1-bad8-4b2e-965b-a0a648db7861" data-sec="4a7dc04f-b501-4a9a-8af6-6f0c35460657"
            //"324d5c8f-096c-4837-8784-2c423e9a3028",
            //"f2f72d5e-b357-4c1f-aa25-29583fbd3af6", //"1c0f397e-c6e9-4517-ba06-48e731d64075"
         }
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