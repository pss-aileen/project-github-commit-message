'use strict';
{

  class JsonData {
    constructor(url) {
      this.url = url;
      this.data = null;
      this.dataPromise = null;
    }

    loadData() {
      if (!this.dataPromise) {
        this.dataPromise = fetch(this.url).then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        }).then(data => {
          this.data = data;
          return data;
        })
      }
      return this.dataPromise;
    }

    async getData() {
      if (!this.data) {
        await this.loadData();
      }
      return this.data;
    }

    async getAllData() {
      const data = await this.getData();
      // console.log(data);
      return this.data;
    }

    async getPrefixType() {
      const data = await this.getData();
      data.map((data) => {
        console.log(data);
        return data;
      })
    }
  }

  class CreateHTMLDOM {
    constructor(data) {
      this.data = data;
    }

    createTypeOptions() {
      const typeDOM = document.getElementById("type");
      for (let i = 0; i < this.data.length; i++) {
        const { displayName, icon, htmlClassName, prefixType, id } = this.data[i];
        const option = document.createElement("option");
        option.value = id;
        option.textContent = icon + " " + displayName;
        if (i === 0) {
          option.selected = true;
        }
        typeDOM.appendChild(option);
      }
    }

    createPrefix() {
      const prefixDOM = document.getElementById("prefix");
      const typeDOM = document.getElementById("type");
      const typeNumber = typeDOM.value;
      const prefixData = this.data[typeNumber].prefix;
      console.log(prefixData);

      for (let i = 0; i < prefixData.length; i++) {
          const { id, prefixIcon, prefixText, description } = prefixData[i];
          const option = document.createElement("option");
          option.value = id;
          option.textContent = `${prefixIcon} ${prefixText}: ${description}`;
          if (i === 0) {
            option.selected = true;
          }
          prefixDOM.appendChild(option);
        }
    }
  }

  class CommitMessage {
    constructor() {

    }
  }



  const url = "./data/data.json";
  const jsonData = new JsonData(url);
  
  async function initialize() {
    const data = await jsonData.getAllData();
    const createDom = new CreateHTMLDOM(data);
    createDom.createTypeOptions();
    createDom.createPrefix();
  }

  initialize();

  const typeDom = document.getElementById("type");

  typeDom.addEventListener("change", async () => {
    console.log(typeDom.value);
    createDom.createPrefix();
  });

} // end