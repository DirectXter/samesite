class Widgets {
  constructor(data, eurUsd) {
    this.data = data;
    this.currencyRate = eurUsd;
  }
  static async pairs() {
    const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    const euUsd = await fetch(
      "https://api-adapter.backend.currency.com/api/v1/exchangeInfo"
    );
    const json = await response.json();
    const eurUsd = await euUsd.json();
    this.currencyRate = eurUsd;
    this.data = json;
  }

  static async createWidget(item) {
    await this.pairs();
    console.log(this.data);
    let add = document.querySelector(".add");
    let remove = document.querySelector(".remove");

    const showPairs = () => {
      let pending = true;
      let card = document.querySelector(".card__body");
      add.remove();
      card.append;
    };
    add.addEventListener("click", showPairs);
  }
  
  static async options() {
    await this.pairs();
    let data = this.data.Valute;
    let p = document.querySelector(".paragraph");
    let card = document.querySelector(".card__body");
    let select = document.createElement("select");
    select.id = "currency";
    card.append(select);

    function createOption() {
      for (const [key, value] of Object.entries(data)) {
        let val = value.Value;
        select.insertAdjacentHTML(
          "beforeend",
          `
       <option data-key=${key} data-value=${val}>${key}</option>
     `
        );
      }
    }
    createOption();

    select.onchange = function() {
      let currencyList = document.getElementById("currency");
      let selected = Array.from(currencyList.options)
        .filter((option) => option.selected)
        .map((option) => option.dataset.value);
      console.log(selected);
      p.innerHTML = selected + " Руб";
    };
  }

  static async exchange() {
    await this.pairs();
    console.log(this.currencyRate);
  }
}
Widgets.pairs();
Widgets.createWidget();
Widgets.options();
Widgets.exchange();
