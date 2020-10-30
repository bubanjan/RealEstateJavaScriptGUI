
const showAllButton = document.querySelector("#showButton");
const searchButton = document.querySelector("#searchBySizeButton");
const searchByPriceButton = document.querySelector("#searchByPriceButton")
const testButton = document.querySelector("#testButton");
const addNewEstateButton = document.querySelector("#createNewButton");
const deleteButton = document.querySelector("#deleteButton");
const aboutButton = document.querySelector("#aboutButton");

const tableCreate = document.querySelector("#tableCreate");
const tableSearch = document.getElementById("#searchT");

const dataDiv = document.querySelector("#dataDiv");

const searchDiv = document.querySelector("#searchDiv");
const searchByPriceDiv = document.querySelector("#searchByPriceDiv");
const createDiv = document.querySelector("#createDiv1");
const deleteDiv = document.querySelector("#deleteDiv");

const searchBySizeOption = document.querySelector("#searchBySizeOption");
const searchByPriceOption = document.querySelector("#searchByPriceOption")
const createOption = document.querySelector("#createOption");
const deleteOption = document.querySelector("#deleteOption");
const info = document.querySelector("#info");

deleteDiv.hidden = true;
searchDiv.hidden = true;
info.hidden = true;
createDiv.style.display = "none";
searchByPriceDiv.hidden = true;
dataDiv.hidden = false;



//tableT.hidden = true;
//  document.getElementById("dataTable").innerHTML = "";


//testButton.onclick = async event => {

//    let estates = await getEstates();
//    let estatesTypeHouse = estates.filter(function (item) {
//        return item.type == "House"
//    });

//    let table = document.querySelector("#dataTable");
//    document.getElementById("dataTable").innerHTML = "";
//    let data = Object.keys(estates[0]);
//    generateTableHead(table, data);
//    generateTable(table, estatesTypeHouse);
//};



createOption.onclick = async event => {

    info.hidden = true;
    searchDiv.hidden = true;
    searchByPriceDiv.hidden = true;
    deleteDiv.hidden = true;
    dataDiv.hidden = false;


    if (createDiv.style.display === "none") {
        createDiv.style.display = "flex";;
    } else {
        createDiv.style.display = "none";;
    }

}

addNewEstateButton.addEventListener("click", () => {


    let inputType = document.querySelector("#typeI");
    let inputLocation = document.querySelector("#locationI");
    let inputDescription = document.querySelector("#descriptionI");
    let inputSize = document.querySelector("#sizeI");
    let inputPrice = document.querySelector("#priceI");


    let typeValue = inputType.value;
    let locationValue = inputLocation.value;
    let descriptionValue = inputDescription.value;
    let sizeValue = parseInt(inputSize.value);
    let priceValue = parseInt(inputPrice.value);

    createData(typeValue, locationValue, descriptionValue, sizeValue, priceValue)

    inputType.value = "";
    inputLocation.value = "";
    inputDescription.value = "";
    inputSize.value = "";
    inputPrice.value = "";

});


deleteOption.onclick = async event => {
    createDiv.style.display = "none";
    searchByPriceDiv.hidden = true;
    searchDiv.hidden = true;
    info.hidden = true;
    dataDiv.hidden = false;

    if (deleteDiv.hidden === true) {
        deleteDiv.hidden = false;
    } else {
        deleteDiv.hidden = true;
    }
}

deleteButton.onclick = async event => {

    document.getElementById("dataTable").innerHTML = "";
    const inputDelete = document.querySelector("#estateId");
    let id = inputDelete.value;
    deleteEstate(id);

    let estates = await getEstates();
    let table = document.querySelector("#dataTable");
   
    let data = Object.keys(estates[0]);
    generateTableHead(table, data);
    generateTable(table, estates);
};

aboutButton.onclick = async event => {

    createDiv.style.display = "none";
    searchByPriceDiv.hidden = true;
    searchDiv.hidden = true;
    dataDiv.hidden = true;
    deleteDiv.hidden = true;
    info.hidden = false;
 
};

searchBySizeOption.onclick = async event => {

    deleteDiv.hidden = true;
    createDiv.style.display = "none";
    searchByPriceDiv.hidden = true;
    deleteDiv.hidden = true;
    info.hidden = true;
    dataDiv.hidden = false;

    if (searchDiv.hidden === true) {
        searchDiv.hidden = false;
    } else {
        searchDiv.hidden = true;
    }
}


searchButton.onclick = async event => {

    const inputMin = document.querySelector("#minsize");
    const inputMax = document.querySelector("#maxsize");

    let min = inputMin.value;
    let max = inputMax.value;

    let estatesA = await getEstatesBySize(min, max);
    let table = document.querySelector("#dataTable");
    document.getElementById("dataTable").innerHTML = "";
    let data = Object.keys(estatesA[0]);
    generateTableHead(table, data);
    generateTable(table, estatesA);
};

searchByPriceOption.onclick = async event => {
    createDiv.hidden = true;
    searchDiv.hidden = true;
    deleteDiv.hidden = true;
    info.hidden = true;
    dataDiv.hidden = false;

    if (searchByPriceDiv.hidden === true) {
        searchByPriceDiv.hidden = false;
    } else {
        searchByPriceDiv.hidden = true;
    }
}


searchByPriceButton.onclick = async event => {

    const inputMinPrice = document.querySelector("#minprice");
    const inputMaxPrice = document.querySelector("#maxprice");

    let minP = inputMinPrice.value;
    let maxP = inputMaxPrice.value;

    let estatesB = await getEstatesByPrice(minP, maxP);
    let table = document.querySelector("#dataTable");
    document.getElementById("dataTable").innerHTML = "";
    let data = Object.keys(estatesB[0]);
    generateTableHead(table, data);
    generateTable(table, estatesB);
};



showAllButton.onclick = async event => {

    dataDiv.hidden = false;
    searchDiv.hidden = true;
    createDiv.hidden = true;
    searchByPriceDiv.hidden = true;
    deleteDiv.hidden = true;
    info.hidden = true;

    let estates = await getEstates();
    let table = document.querySelector("#dataTable");
    document.getElementById("dataTable").innerHTML = "";
    let data = Object.keys(estates[0]);
    generateTableHead(table, data);
    generateTable(table, estates);
};

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

async function getEstates() {
    const response = await fetch("https://realestatewebapinb.azurewebsites.net/api/estates/");
    const estates = await response.json();
    return estates;
}


async function getEstatesBySize(a, b) {
    const response = await fetch("https://realestatewebapinb.azurewebsites.net/api/estates/" + a + "," + b);
    const estates = await response.json();
    return estates;
}

async function getEstatesByPrice(a, b) {
    const response = await fetch("https://realestatewebapinb.azurewebsites.net/api/estates/" + a + "-" + b);
    const estates = await response.json();
    return estates;
}

async function deleteEstate(a) {

    fetch('https://realestatewebapinb.azurewebsites.net/api/estates/' + a, {
        method: 'delete',
    })

        .then(res => res.json())
        .then(res => console.log(res));

}


async function createData(inpT, inpL, inpD, inpS, inpP) {

    fetch('https://realestatewebapinb.azurewebsites.net/api/estates', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            "type": inpT,
            "location": inpL,
            "description": inpD,
            "size": inpS,
            "price": inpP
        })
    }).then(res => res.json())
        .then(res => console.log(res));

}
