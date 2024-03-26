'use strict';
{

  /*
    TYPEとPREFIXを追加したい場合はdata/data.jsonを追加すること
  */

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
        option.value = constant;
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
      const text = `daily report ${day.getFullYear() - 2000}${String(day.getMonth() + 1).padStart(2, "0")}${String(day.getDate()).padStart(2, "0")}`;
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
    constructor(data) {
      this.type = document.getElementById("type").value;
      this.prefix = document.getElementById("prefix").value;
      this.subject = document.getElementById("subject").value;
      this.comment = document.getElementById("comment").value;
      this.issue = document.getElementById("issue").value;
      this.prefixIcon = null;
      this.prefixName = null;
      this.data = data;
      this.messageOutput = document.getElementById("message-output");
    }

    setPrefix() {
      
      console.log(this.type, this.prefix, this.data);
      for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j < this.data[i].prefix.length; j++) {
          if (this.prefix === this.data[i].prefix[j].constant) {
            this.prefixIcon = this.data[i].prefix[j].prefixIcon;
            this.prefixName = this.data[i].prefix[j].prefixText;
          }

        }
      }

    }

    setMessage() {
      this.messageOutput.value = this.getMessage();
    }

    getMessage() {
      let message = "";

      message = message + this.getCommitStartSentence();

      const WITH_NOTHING = !this.issue && !this.comment;
      const WITH_ISSUE = this.issue && !this.comment;
      const WITH_COMMENT = !this.issue && this.comment;
      const WITH_ISSUE_AND_COMMENT = this.issue && this.comment;

      if (WITH_NOTHING) {
        message = message + this.getCommitFirstLine();
      } else if (WITH_ISSUE) {
        message = message + this.getCommitFirstLineWithIssue();
      } else if (WITH_COMMENT) {
        message = message + this.getCommitFirstLine() + this.getCommitSecondLine();
      } else if (WITH_ISSUE_AND_COMMENT) {
        message = message + this.getCommitFirstLineWithIssue() + this.getCommitSecondLine();
      }

      return message;
    }

    getCommitStartSentence() {
      return "git commit"
    }

    getCommitFirstLine() {
      return ` -m "${this.prefixIcon} ${this.prefixName}: ${this.subject}"`;
    }

    getCommitFirstLineWithIssue() {
      return ` -m "${this.prefixIcon} ${this.prefixName}: ${this.subject} (#${this.issue})"`;
    }

    getCommitSecondLine() {
      return ` -m "${this.comment}"`;
    }
  }

  class Reset {
    constructor() {
    }

    setBlank() {
      document.getElementById("subject").value = "";
      document.getElementById("comment").value = "";
      document.getElementById("issue").value = "";
      document.getElementById("message-output").value = "🧙🪄";
    }
  }

  class Copy {
    constructor() {

    }

    setClipboard() {
      const text = document.getElementById("message-output").value;
      navigator.clipboard.writeText(text);
      copyBtn.textContent = "CLIPED!";
      setTimeout(() => {
        copyBtn.textContent = "COPY";
      },
        1000);
    }
  }



  class DarkMode {
    constructor() {

    }

    getDOMElements() {
      const body = document.getElementById("body");
      const resetBtn = document.getElementById("btn-reset");
      const input = document.querySelectorAll("input");
      const select = document.querySelectorAll("select");
      const comment = document.getElementById("comment");
      const generatedMessage = document.getElementById("message-output");
      const modeBtn = document.getElementById("btn-mode");
      const elements = [body, resetBtn, input, select, comment, generatedMessage];
      return { elements, modeBtn };
    }

    getLocalStorage() {
      const monitorMode = JSON.parse(localStorage.getItem("displayMode"));
      return monitorMode;
    }

    setLocalStorageLightMode() {
      localStorage.setItem("displayMode", JSON.stringify("lightmode"));
    }
    
    setLocalStorageDarkMode() {
      localStorage.setItem("displayMode", JSON.stringify("darkmode"));
    }

    judgeInitMode() {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const monitorMode = this.getLocalStorage();

      if (darkModeMediaQuery.matches) {
        console.log("judge: system dark");
        this.switchToDarkMode();
      } else if (!darkModeMediaQuery.matches) {
        console.log("judge: system light");
        this.switchToLightMode();
      } else if (monitorMode === "darkmode") {
        console.log("localStorage DARK");
        this.switchToDarkMode();
      } else {
        console.log("localStorage LIGHT");
        this.switchToLightMode();
      }
    }

    judgeEvent() {
      const { modeBtn } = this.getDOMElements();
      if (modeBtn.textContent === "🌞") {
        this.switchToDarkMode();
      } else {
        this.switchToLightMode();
      }

    }
  
    switchToDarkMode() {
      const {elements, modeBtn} = this.getDOMElements();
      this.setLocalStorageDarkMode();

      modeBtn.textContent = "🌛";

      for (let i = 0; i < elements.length; i++) {
        if (elements[i].length > 0) {
          for (const element of elements[i]) {
            element.classList.add("darkmode");
          }
        } else {
          elements[i].classList.add("darkmode");
        }
      }
    }

    switchToLightMode() {
      const {elements, modeBtn} = this.getDOMElements();
      this.setLocalStorageLightMode();

      modeBtn.textContent = "🌞";

      for (let i = 0; i < elements.length; i++) {
        if (elements[i].length > 0) {
          for (const element of elements[i]) {
            element.classList.remove("darkmode");
          }
        } else {
          elements[i].classList.remove("darkmode");
        }
      }
    }
  }


  /*************************************************
  *************************************************/


  const url = "./data/data.json";
  const jsonData = new JsonData(url);
  
  async function initialize() {
    const data = await jsonData.getAllData();
    const createDom = new CreateHTMLDOM(data);
    createDom.createTypeOptions();
    createDom.createPrefix();
    const setSpecificSubject = new SetSpecificSubject(prefixDom.value);
    setSpecificSubject.checkType();
    const darkmode = new DarkMode();
    darkmode.judgeInitMode();
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

  const btnGenerate = document.getElementById("btn-generate");

  btnGenerate.addEventListener("click", async(e) => {
    e.preventDefault();
    const data = await jsonData.getAllData();
    const commitMessage = new CommitMessage(data);
    commitMessage.setPrefix();
    commitMessage.setMessage();
  });

  const btnReset = document.getElementById("btn-reset");

  btnReset.addEventListener("click", (e) => {
    (e).preventDefault();
    const reset = new Reset();
    reset.setBlank();
  });

  const copyBtn = document.getElementById("btn-copy");

  copyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const copy = new Copy();
    copy.setClipboard();
  });

  const modeBtn = document.getElementById("btn-mode");

  modeBtn.addEventListener("click", () => {
    const darkmode = new DarkMode();
    darkmode.judgeEvent();
  });

} // end