


function buildWineTable() {
    var table_parent = document.getElementById("table wrapper");
    var table = document.getElementById('wine data');
    table_parent.removeChild(table);

    table = document.createElement("TABLE");
    table.setAttribute("id","wine data");
    var headerRow = document.createElement("tr");
    var header;

    //create header row
    header = document.createElement("th");
    header.textContent = "Wine name";
    headerRow.appendChild(header);
    header = document.createElement("th");
    header.textContent = "Price";
    headerRow.appendChild(header);
    header = document.createElement("th");
    header.textContent = "Year";
    headerRow.appendChild(header);
    header = document.createElement("th");
    header.textContent = "Winery";
    headerRow.appendChild(header);
    header = document.createElement("th");
    header.textContent = "Variety";
    headerRow.appendChild(header);
    table.appendChild(headerRow);

    //create data rows
    var req = new XMLHttpRequest();
    req.open("GET", "/getWineTable", true);
    req.addEventListener('load',function() {
        if(req.status >= 200 && req.status < 400) {
            var wines = JSON.parse(req.responseText);

            //create data cells for all data except id
            wines.forEach(function(wine) {
                var row = document.createElement("tr");
                var cell;
                for (var p in wine) {
                    cell = document.createElement("td");
                    cell.textContent = wine[p];
                    row.appendChild(cell);
                }
                table.appendChild(row);
            });
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);

    table_parent.appendChild(table);
}

function buildWineryTable() {
    var table_parent = document.getElementById("table wrapper");
    var table = document.getElementById('wine data');
    table_parent.removeChild(table);

    table = document.createElement("TABLE");
    table.setAttribute("id","wine data");
    var headerRow = document.createElement("tr");
    var header;

    //create header row
    header = document.createElement("th");
    header.textContent = "Winery name";
    headerRow.appendChild(header);
    header = document.createElement("th");
    header.textContent = "City";
    headerRow.appendChild(header);
    header = document.createElement("th");
    header.textContent = "Region";
    headerRow.appendChild(header);
    table.appendChild(headerRow);

    //create data rows
    var req = new XMLHttpRequest();
    req.open("GET", "/getWineryTable", true);
    req.addEventListener('load',function() {
        if(req.status >= 200 && req.status < 400) {
            var wineries = JSON.parse(req.responseText);

            //create data cells for all data except id
            wineries.forEach(function(winery) {
                var row = document.createElement("tr");
                var cell;
                for (var p in winery) {
                    cell = document.createElement("td");
                    cell.textContent = winery[p];
                    row.appendChild(cell);
                }
                table.appendChild(row);
            });
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);

    table_parent.appendChild(table);
}

function buildRegionVarietyTable() {
    var table_parent = document.getElementById("table wrapper");
    var table = document.getElementById('wine data');
    table_parent.removeChild(table);

    table = document.createElement("TABLE");
    table.setAttribute("id","wine data");
    var headerRow = document.createElement("tr");
    var header;

    //create header row
    header = document.createElement("th");
    header.textContent = "Region";
    headerRow.appendChild(header);
    header = document.createElement("th");
    header.textContent = "Variety";
    headerRow.appendChild(header);
    table.appendChild(headerRow);

    //create data rows
    var req = new XMLHttpRequest();
    req.open("GET", "/getRegionVarietyTable", true);
    req.addEventListener('load',function() {
        if(req.status >= 200 && req.status < 400) {
            var regions = JSON.parse(req.responseText);

            //create data cells
            regions.forEach(function(region) {
                var row = document.createElement("tr");
                var cell;
                for (var p in region) {
                    cell = document.createElement("td");
                    cell.textContent = region[p];
                    row.appendChild(cell);
                }
                table.appendChild(row);
            });
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);

    table_parent.appendChild(table);
}

function buildWineTableSearch(year) {
    var table_parent = document.getElementById("table wrapper");
    var table = document.getElementById('wine data');
    table_parent.removeChild(table);

    table = document.createElement("TABLE");
    table.setAttribute("id","wine data");
    var headerRow = document.createElement("tr");
    var header;

    //create header row
    header = document.createElement("th");
    header.textContent = "Wine name";
    headerRow.appendChild(header);
    header = document.createElement("th");
    header.textContent = "Price";
    headerRow.appendChild(header);
    header = document.createElement("th");
    header.textContent = "Year";
    headerRow.appendChild(header);
    header = document.createElement("th");
    header.textContent = "Winery";
    headerRow.appendChild(header);
    header = document.createElement("th");
    header.textContent = "Variety";
    headerRow.appendChild(header);
    table.appendChild(headerRow);


    //create data rows
    var req = new XMLHttpRequest();
    req.open("GET", "/searchWine?year=" + year, true);
    req.addEventListener('load',function() {
        if(req.status >= 200 && req.status < 400) {
            var wines = JSON.parse(req.responseText);

            //create data cells
            wines.forEach(function(wine) {
                var row = document.createElement("tr");
                var cell;
                for (var p in wine) {
                    cell = document.createElement("td");
                    cell.textContent = wine[p];
                    row.appendChild(cell);
                }
                table.appendChild(row);
            });
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
    event.preventDefault();

    table_parent.appendChild(table);
}

/* View wine bottles table */
document.getElementById('view wine bottles').addEventListener('click', function(event){
    buildWineTable();
});

/* View wineries table */
document.getElementById('view wineries').addEventListener('click', function(event){
    buildWineryTable();
});

/* View regions and varieties present there */
document.getElementById('view regions_varieties').addEventListener('click', function(event){
    buildRegionVarietyTable();
});

/* Search for win after a given year */
document.getElementById('search').addEventListener('click', function(event){
    var year = document.getElementById('year_search').value;
    buildWineTableSearch(year);
});

/* Delete a wine */
document.getElementById('delete').addEventListener('click', function(event){

    var name = document.getElementById('wine_delete').value;

    var req = new XMLHttpRequest();
    req.open("GET", "/deleteWine?name="+name, true);
    req.addEventListener('load',function() {
        if(req.status >= 200 && req.status < 400) {
            buildWineTable();
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
    event.preventDefault();
});

/* Adding a wine */
document.getElementById('add wine').addEventListener('click', function(event){

    var req = new XMLHttpRequest();
    var name = document.getElementById('wine_name').value;
    var price = document.getElementById('price').value;
    var year = document.getElementById('year').value;
    var winery = document.getElementById('winery_wine').value;
    var variety = document.getElementById('variety_wine').value;

    req.open("GET", "/addWine?name="+name+"&price="+price+"&year="+year+"&winery="+winery+"&variety="+variety, true);
    req.addEventListener('load',function() {
        if(req.status >= 200 && req.status < 400) {
            buildWineTable();
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
    event.preventDefault();
});

/* Adding a region */
document.getElementById('add region').addEventListener('click', function(event){

    var req = new XMLHttpRequest();
    var name = document.getElementById('region name').value;
    var country = document.getElementById('country').value;
    var climate = document.getElementById('climate').value;
    var soil_type = document.getElementById('soil type').value;
    req.open("GET", "/addRegion?name="+name+"&country="+country+"&climate="+climate+"&soil_type="+soil_type, true);
    req.addEventListener('load',function() {
        if(req.status >= 200 && req.status < 400) {
            buildRegionTable();
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
    event.preventDefault();
});

/* Adding a variety */
document.getElementById('add variety').addEventListener('click', function(event){

    var req = new XMLHttpRequest();
    var name = document.getElementById('variety').value;
    req.open("GET", "/addVariety?name="+name, true);
    req.addEventListener('load',function() {
        if(req.status >= 200 && req.status < 400) {
            buildVarietyTable();
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
    event.preventDefault();
});

/* Adding a winery */
document.getElementById('add winery').addEventListener('click', function(event){

    var req = new XMLHttpRequest();
    var winery = document.getElementById('winery').value;
    var city = document.getElementById('city').value;
    var region = document.getElementById('winery region').value;

    req.open("GET", "/addWinery?name="+winery+"&city="+city+"&region="+region, true);
    req.addEventListener('load',function() {
        if(req.status >= 200 && req.status < 400) {
            buildWineryTable();
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
    event.preventDefault();
});

/* Adding a variety_region relationship */
document.getElementById('add variety_region').addEventListener('click', function(event){

    var req = new XMLHttpRequest();
    var variety = document.getElementById('variety_rel').value;
    var region = document.getElementById('region_rel').value;

    req.open("GET", "/addVarietyRegion?region="+region+"&variety="+variety, true);
    req.addEventListener('load',function() {
        if(req.status >= 200 && req.status < 400) {
            buildRegionVarietyTable();
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
    event.preventDefault();
});
