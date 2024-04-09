async function showExchangeRateGraph(){
    const response = await fetch("https://www.floatrates.com/daily/usd.json");
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
}

async function importNames(){
    console.log(currencies);
}

importNames();