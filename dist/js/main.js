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
        option.value = prefixType;
        option.textContent = icon + " " + displayName;
        if (i === 0) {
          option.selected = true;
        }
        typeDOM.appendChild(option);
      }
    }

    createPrefix() {
      this.clearCurrentPrefix();
      const prefixDOM = document.getElementById("prefix");
      const typeDOM = document.getElementById("type");
      const typeNumber = typeDOM.selectedIndex;
      const prefixData = this.data[typeNumber].prefix;
      console.log(prefixData);

      for (let i = 0; i < prefixData.length; i++) {
        const { id, prefixIcon, prefixText, description, constant } = prefixData[i];
        const option = document.createElement("option");
        option.value = `${typeDOM.value}-${constant}`;
        option.textContent = `${prefixIcon} ${prefixText}: ${description}`;
        if (i === 0) {
          option.selected = true;
        }
        prefixDOM.appendChild(option);
      }
    }

    clearCurrentPrefix() {
      const prefixDOM = document.getElementById("prefix");
      while (prefixDOM.firstChild) {
        prefixDOM.removeChild(prefixDOM.firstChild);
      }
    }
  }


  class SetSpecificSubject {
    constructor(prefixValue) {
      this.prefixValue = prefixValue;
      this.subjectDOM = document.getElementById("subject");
    }

    getprefixValue() {
      return this.prefixValue;
    }

    checkType() {
      console.log(this.prefixValue);
      const setTilUpdate = this.prefixValue === "til-update" ? this.setText(this.tilUpdate()) : "";
      const normalNewProject = this.prefixValue === "normal-newProject" ? this.setText(this.normalNewProject()) : "";
      const normalNew = this.prefixValue === "normal-release" ? this.setText(this.normalRelease()) : "";
    }

    setText(text) {
      this.subjectDOM.value = text;
    }

    tilUpdate() {
      const day = new Date();
      const text = `DAILY REPORT ${day.getFullYear() - 2000}${String(day.getMonth() + 1).padStart(2, "0")}${String(day.getDate()).padStart(2, "0")}`;
      return text;
    }

    normalNewProject() {
      return "BEGIN NEW PROJECT";
    }

    normalRelease() {
      return "Version";
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
    const setSpecificSubject = new SetSpecificSubject(prefixDom.value);
    setSpecificSubject.checkType();
  }

  initialize();

  const typeDom = document.getElementById("type");

  typeDom.addEventListener("change", async () => {
    const data = await jsonData.getAllData();
    const createDom = new CreateHTMLDOM(data);
    createDom.createPrefix();
    const setSpecificSubject = new SetSpecificSubject(prefixDom.value);
    setSpecificSubject.checkType();
  });

  const prefixDom = document.getElementById("prefix");

  prefixDom.addEventListener("change", () => {
    const prefixDom = document.getElementById("prefix");
    const setSpecificSubject = new SetSpecificSubject(prefixDom.value);
    setSpecificSubject.checkType();
  });

} // end