var products = [];
function fetchData() {
    fetch("https://dummyjson.com/products")
        .then(function (response) {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
        .then(function (json) {
        var resData = json.products;
        resData.map(function (item) {
            products.push({
                id: item.id,
                title: item.title,
                description: item.description,
                brand: item.brand,
                category: item.category,
            });
        });
        hideLoader();
    })
        .catch(function (error) {
        alert(error);
    });
}
function hideLoader() {
    var loaderDiv = document.getElementById("loaderDiv");
    loaderDiv.style.display = "none";
    showTable();
}
function showTable() {
    var table = document.createElement("table");
    var tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    var header = ["ID", "Title", "Description", "Brand", "Category"];
    var tr = document.createElement("tr");
    for (var i = 0; i < header.length; i++) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(header[i]));
        tr.appendChild(th);
        tableBody.appendChild(tr);
    }
    for (var i = 0; i < products.length; i++) {
        var tr_1 = document.createElement("tr");
        for (var j = 0; j < Object.keys(products[i]).length; j++) {
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(products[i][Object.keys(products[i])[j]]));
            tr_1.appendChild(td);
        }
        tableBody.appendChild(tr_1);
    }
    var productsTable = document.getElementById("productsTable");
    productsTable.appendChild(table);
    productsTable.style.display = "block";
}
fetchData();
