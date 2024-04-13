// async function createOptions(){
//     const response = await fetch("https://data.thailand.opendevelopmentmekong.net/th/api/3/action/datastore_search?resource_id=108125ab-7323-4b29-bcbe-9fc8bb24acbf")
//     const wholeData = await response.json();
//     const provinces = wholeData.result.records.map(e => e.province)
//     const dropdown = document.getElementById("province");
//     for (let i = 0; i < provinces.length; i++){
//         var option = document.createElement("option");
//         option.textContent = provinces[i];
//         option.value = i;
//         dropdown.appendChild(option);
//         //console.log(provinces[i]);
//     }
// }

let provinces = [];
function addProvince(province) {
    if (!provinces.includes(province)) {
        provinces.push(province);
        console.log("addProvince: " + provinces);
        showDoughnutChart(provinces);
        showBarChartMF(provinces);
    }   
}

async function createOptions(){
    const provinces = ['Amnat Charoen', 'Ang Thong', 'Bangkok', 'Bueng Kan', 'Buri Ram', 'Chachoengsao', 'Chai Nat', 'Chaiyaphum', 'Chanthaburi', 'Chiang Mai', 'Chiang Rai', 'Chon Buri', 'Chumphon', 'Kalasin', 'Kamphaeng Phet', 'Kanchanaburi', 'Khon Kaen', 'Krabi', 'Lampang', 'Lamphun', 'Loei', 'Lop Buri', 'Mae Hong Son', 'Maha Sarakham', 'Mukdahan', 'Nakhon Nayok', 'Nakhon Pathom', 'Nakhon Phanom', 'Nakhon Ratchasima', 'Nakhon Sawan', 'Nakhon Si Thammarat', 'Nan', 'Narathiwat', 'Nong Bua Lam Phu', 'Nong Khai', 'Nonthaburi', 'Pathum Thani', 'Pattani', 'Phangnga', 'Phatthalung', 'Phayao', 'Phetchabun', 'Phetchaburi', 'Phichit', 'Phitsanulok', 'Phra Nakhon Si Ayutthaya', 'Phrae', 'Phuket', 'Prachin Buri', 'Prachuap Khiri Khan', 'Ranong', 'Ratchaburi', 'Rayong', 'Roi Et', 'Sa Kaeo', 'Sakon Nakhon', 'Samut Prakan', 'Samut Sakhon', 'Samut Songkhram', 'Saraburi', 'Satun', 'Si Sa Ket', 'Sing Buri', 'Songkhla', 'Sukhothai', 'Suphan Buri', 'Surat Thani', 'Surin', 'Tak', 'Trang', 'Trat', 'Ubon Ratchathani', 'Udon Thani', 'Uthai Thani', 'Uttaradit', 'Yala', 'Yasothon'];
    const dropdown = document.getElementById("province");
    for (let i = 0; i < provinces.length; i++){
        var option = document.createElement("option");
        option.textContent = provinces[i];
        option.value = i;
        dropdown.appendChild(option);
    }
    
}
async function createOptions2(){
    const listSortBy = ['Total Population', 'Male', 'Female', 'Household'];
    const dropdown2 = document.getElementById("sortBy");
    for (let i = 0; i < listSortBy.length; i++){
        var option2 = document.createElement("option");
        option2.textContent = listSortBy[i];
        option2.value = i;
        dropdown2.appendChild(option2);
    }
}

//to-do: make the chart updatable
let colors = [];
async function showDoughnutChart(provinces){
    const response = await fetch("https://data.thailand.opendevelopmentmekong.net/th/api/3/action/datastore_search_sql?sql=SELECT%20_id,%20province,%20total,%20male,%20female,%20household%20from%20%22108125ab-7323-4b29-bcbe-9fc8bb24acbf%22")
    const wholeData = await response.json();
    const provinceNames = wholeData.result.records
        .filter(e => provinces.includes(e._id.toString()))
        .map(x => x.province);
    const populationData = wholeData.result.records
        .filter(e => provinces.includes(e._id.toString()))
        .map(x => x.total);

    let theRestPop = 66558935;
    populationData.forEach(e => theRestPop -= e);
    populationData.push(theRestPop);
    provinceNames.push("The rest of population");
    

    colors.push([[Math.round(Math.random()*(256 - 150) + 150), Math.round(Math.random()*(256 - 150) + 150), Math.round(Math.random()*(256 - 150) + 150)]]);
    colors.splice(0,0,[[Math.round(Math.random()*(256 - 150) + 150), Math.round(Math.random()*(256 - 150) + 150), Math.round(Math.random()*(256 - 150) + 150)]]);
    bgColors = colors.map(e => "rgb(" + e.join(",") + ")");
    console.log(bgColors);

    // console.log(provinceNames);
    // console.log(populationData);
    if (typeof DoughnutChart != "undefined") {
        DoughnutChart.destroy();
    }
    DoughnutChart = new Chart(doughnutChart, {
        type:'doughnut',
        data: {
          labels: provinceNames,
          datasets: [{
            label: 'Population',
            data: populationData,
            backgroundColor: bgColors,
            hoverBackgroundColor: 'rgb(255, 99, 132)',
            hoverOffset: 40,
          }]
        },
        options: {
            layout: {
                padding: 20
            }
        }
    });
}

async function showBarChartMF(provinces){
    
    const response = await fetch("https://data.thailand.opendevelopmentmekong.net/th/api/3/action/datastore_search_sql?sql=SELECT%20_id,%20province,%20total,%20male,%20female,%20household%20from%20%22108125ab-7323-4b29-bcbe-9fc8bb24acbf%22")
    const wholeData = await response.json();
    const provinceNames = wholeData.result.records
        .filter(e => provinces.includes(e._id.toString()))
        .map(x => x.province);
    const populationMale = wholeData.result.records
        .filter(e => provinces.includes(e._id.toString()))
        .map(x => x.male);
    const populationFemale = wholeData.result.records
        .filter(e => provinces.includes(e._id.toString()))
        .map(x => x.female);
    const wholePopulation = wholeData.result.records
        .filter(e => provinces.includes(e._id.toString()))
        .map(x => x.total);

    let PERCENTMale = populationMale.map(i => (i/wholePopulation[populationMale.indexOf(i)]) * 100);
    let PERCENTFemale = populationFemale.map(i => (i/wholePopulation[populationFemale.indexOf(i)]) * 100);

    if (typeof BarChartMF != "undefined") {
        BarChartMF.destroy();
    }

    BarChartMF = new Chart(barChartMF, {
        type: 'bar',
        data: {
        labels: provinceNames,
        datasets: [{
            label: 'Male Percentage',
            data: PERCENTMale,
            backgroundColor: "rgb(96, 161, 230)",
            borderWidth: 1,
            hoverBackgroundColor: 'rgb(92, 98, 214)',
            hoverOffset: 50
        },{
            label: 'Female Percentage',
            data: PERCENTFemale,
            backgroundColor: "rgb(230, 117, 220)",
            borderWidth: 1,
            hoverBackgroundColor: 'rgb(217, 82, 185)',
            hoverOffset: 50
        }]

        },
        options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
        }
    });

}

async function showBarChartSort(limit, sortByThis){
    const listSortBy = ['Total Population', 'Male', 'Female', 'Household'];
    const listSortBy2 = ['total', 'male', 'female', 'household'];
    let qSortBy = listSortBy2[sortByThis];
    let q = "https://data.thailand.opendevelopmentmekong.net/th/api/3/action/datastore_search_sql?sql=SELECT _id, province, total, male, female, household from \"108125ab-7323-4b29-bcbe-9fc8bb24acbf\" ORDER BY "+qSortBy+" DESC LIMIT "+limit;
    const response = await fetch(q)
    const wholeData = await response.json();
    console.log("wholeData: " + wholeData.result.records);
    const provinceNames =wholeData.result.records.map(x=>x.province);
    const dataValue =wholeData.result.records.map(x=>x[qSortBy]);
    if (typeof BarChartSort != "undefined") {
        BarChartSort.destroy();
    }

    let colors2 = []
    for(let i = 0; i<77; i++){
    colors2.push([[Math.round(Math.random()*(256 - 150) + 150), Math.round(Math.random()*(256 - 150) + 150), Math.round(Math.random()*(256 - 150) + 150)]]);
    }
    bgColors2 = colors2.map(e => "rgb(" + e.join(",") + ")");

    BarChartSort = new Chart(barChartSort, {
        type: 'bar',
        data: {
        labels: provinceNames,
        datasets: [{
            label: listSortBy[sortByThis],
            data: dataValue,
            backgroundColor: bgColors2,
            borderWidth: 1,
            hoverBackgroundColor: 'rgb(92, 98, 214)',
            hoverOffset: 50
        }]
        },
        options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
        }
    });
}