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

async function createOptions(){
    const provinces = ['Amnat Charoen', 'Ang Thong', 'Bangkok', 'Bueng Kan', 'Buri Ram', 'Chachoengsao', 'Chai Nat', 'Chaiyaphum', 'Chanthaburi', 'Chiang Mai', 'Chiang Rai', 'Chon Buri', 'Chumphon', 'Kalasin', 'Kamphaeng Phet', 'Kanchanaburi', 'Khon Kaen', 'Krabi', 'Lampang', 'Lamphun', 'Loei', 'Lop Buri', 'Mae Hong Son', 'Maha Sarakham', 'Mukdahan', 'Nakhon Nayok', 'Nakhon Pathom', 'Nakhon Phanom', 'Nakhon Ratchasima', 'Nakhon Sawan', 'Nakhon Si Thammarat', 'Nan', 'Narathiwat', 'Nong Bua Lam Phu', 'Nong Khai', 'Nonthaburi', 'Pathum Thani', 'Pattani', 'Phangnga', 'Phatthalung', 'Phayao', 'Phetchabun', 'Phetchaburi', 'Phichit', 'Phitsanulok', 'Phra Nakhon Si Ayutthaya', 'Phrae', 'Phuket', 'Prachin Buri', 'Prachuap Khiri Khan', 'Ranong', 'Ratchaburi', 'Rayong', 'Roi Et', 'Sa Kaeo', 'Sakon Nakhon', 'Samut Prakan', 'Samut Sakhon', 'Samut Songkhram', 'Saraburi', 'Satun', 'Si Sa Ket', 'Sing Buri', 'Songkhla', 'Sukhothai', 'Suphan Buri', 'Surat Thani', 'Surin', 'Tak', 'Trang', 'Trat', 'Ubon Ratchathani', 'Udon Thani', 'Uthai Thani', 'Uttaradit', 'Yala', 'Yasothon'];
    const dropdown = document.getElementById("province");
    for (let i = 0; i < provinces.length; i++){
        var option = document.createElement("option");
        option.textContent = provinces[i];
        option.value = i;
        dropdown.appendChild(option);
        //console.log(provinces[i]);
    }
}

//to-do: make the chart updatable
async function showDoughnutChart(provinces){
    const response = await fetch("https://data.thailand.opendevelopmentmekong.net/th/api/3/action/datastore_search?resource_id=108125ab-7323-4b29-bcbe-9fc8bb24acbf")
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

    // console.log(provinceNames);
    // console.log(populationData);

    new Chart(doughnutChart, {
        type:'doughnut',
        data: {
          labels: provinceNames,
          datasets: [{
            label: 'Population',
            data: populationData,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 50
          }]
        }
      });
}