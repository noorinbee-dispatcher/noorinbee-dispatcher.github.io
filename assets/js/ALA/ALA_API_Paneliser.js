
//https://biocache-ws.ala.org.au/ws/occurrences/search?q=*:*&lat=-37.5667&lon=149.15&radius=55.0&fq=species_group:%22Plants%22&fq=multimedia:%22Image%22&pageSize=5&start=0
var pagesize = 3;
var fromstart = 0;
var maxloop = 1200;


//////////////////////////////////////////////////

function loopedALAGet(target, filterq, pagesize, fromstart) {
    url = 'https://biocache-ws.ala.org.au/ws/occurrences/search?q=*:*&lat=-37.5667&lon=149.15&radius=55.0'
        + filterq
        + '&sort=genus'
        + '&fq=multimedia:%22Image%22'
        + '&pageSize=' + pagesize
        + '&start=' + fromstart
        + '&n=50';
    fetcherise(url, {}, function (response) {
        response.json().then(function (occ) {
            if (occ['occurrences'].length > 0 && fromstart < maxloop) {
                loopALAPage(target, occ['occurrences']);
                loopedALAGet(target, filterq, pagesize, fromstart + pagesize);
            }
        });
    });
}

function loopALAPage(target, results) {

    // var row = document.createElement("tr");
    // target.appendChild(row);

    for (i = 0; i < results.length; i++) {
        //console.log(results[i]);
        // var column = document.createElement("td");

        // row.appendChild(column);
        var ref = document.createElement("a");
        var txt = document.createElement("span");
        var holder = document.createElement("div");
        var panel = document.createElement("img");

        panel.setAttribute("src", results[i]['smallImageUrl']);
        // panel.setAttribute("style", 'max-height:220px;width:115%;margin: auto; display: block; padding-top:6px;');

        // ref.setAttribute("style", 'max-width:180px;word-wrap: break-word;display: inline-block;');
        ref.setAttribute("href", 'https://biocache.ala.org.au/occurrences/' + results[i]['uuid']);
        ref.setAttribute("target", "_blank");

        // txt.setAttribute("style",'margin-left: -10%;padding-right: 8px;display: block;border-right: 1px solid gray;');

        // holder.setAttribute("style", 'height:260px;min-width:31%;max-width:95%;margin:auto; float:left;text-align:right;padding:8px;margin-top:26px');
        // holder.setAttribute("style", 'max-width:240px;margin:auto; display: block;text-align:right;padding-top:4px;padding-bottom:8px;');

        desc = "";
        if (results[i]['vernacularName']) {
            desc = results[i]['vernacularName'] + " ";
        }


        if (results[i]['species']) {
            desc = desc + "(" + results[i]['species'] + ") ";
        } else
            if (results[i]['genus']) {
                desc = desc + "(" + results[i]['genus'] + ") ";
            } else
                if (results[i]['family']) {
                    desc = desc + "(" + results[i]['family'] + ") ";
                } else
                    if (results[i]['scientificName']) {
                        desc = desc + "(" + results[i]['scientificName'] + ") ";
                    }


        if (results[i]['raw_occurrenceRemarks']) {
            desc = desc + (results[i]['raw_occurrenceRemarks'] + " ").truncateBySent(1);
        } else
            if (results[i]['dataResourceName']) {
                desc = desc + (results[i]['dataResourceName'] + " ").truncateBySent(1);
            }

        if (desc.length > 72) {
            desc = desc.substr(0, 72) + '...';
        }
        txt.innerHTML = desc;

        // ref.innerHTML = desc;
        // column.appendChild(holder);
        target.appendChild(holder);
        holder.appendChild(ref);
        ref.appendChild(panel);
        ref.appendChild(txt);
    }
}

// Works great, from --> https://chrisbitting.com/2019/08/22/how-to-truncate-trim-text-by-sentence-in-javascript-not-word-or-character/

String.prototype.truncateBySent = function (sentCount = 3, moreText = "") {
    //match ".","!","?" - english ending sentence punctuation
    var sentences = this.match(/[^\.!\?]+[\.!\?]+/g);
    if (sentences) {
        //console.log(sentences.length);
        if (sentences.length >= sentCount && sentences.length > sentCount) {
            //has enough sentences
            return sentences.slice(0, sentCount).join(" ") + moreText;
        }
    }
    //return full text if nothing else
    return this;
};
