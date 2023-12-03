'use strict';
{
  class data {
    constructor(prefixIcon, prefixName, subject, comment, issue) {
      this.prefixIcon = prefixIcon;
      this.prefixName = prefixName;
      this.subject = subject;
      this.comment = comment;
      this.issue = issue;
    }
    
    getMessage() {
      let message = "";

      message = message + this.getCommitStartSentence();

      const IssueAndMessage = this.issue && this.comment;
      const IssueAndNoMessage = this.issue && !this.comment;
      const NoIssueAndMessage = !this.issue && this.comment;
      const NoIssueAndNoMessage = !this.issue && !this.comment;

      if (IssueAndMessage) {
        message = message + this.getCommitFirstLineWithIssue() + this.getCommitSecondLine();
      } else if (IssueAndNoMessage) {
        message = message + this.getCommitFirstLineWithIssue();
      } else if (NoIssueAndMessage) {
        message = message + this.getCommitFirstLine() + this.getCommitSecondLine();
      } else if (NoIssueAndNoMessage) {
        message = message + this.getCommitFirstLine();
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

  
  /**********************************
   PREFIX LIST
  **********************************/
  
  class prefix {
    constructor(name, icon ,description) {
      this.name = name;
      this.icon = icon;
      this.description = description;
    }
 
    getPrefixIcon() {
      return this.icon;
    }
 
    getPrefixName() {
      return this.name;
    }
  }
  
  const feature = new prefix("FEATURE", "💕", "メソッド、条件分岐、改良、ファイル追加した時");
  const refactor = new prefix("REFACTOR", "🫶", "機能を変えずにコードを書き換えた時");
  const docs = new prefix("DOCS", "📖", "コードに関係ない、影響がない時");
  const fix = new prefix("FIX", "🐝", "不具合の修正");
  const release = new prefix("RELEASE", "🔖", "Version 1.0.0");
  const newProject = new prefix("NEW", "🎉", "BEGIN NEW PROJECT");

  const prefixList = [
    feature,
    refactor,
    docs,
    fix,
    release,
    newProject,
  ];


  createPrefixPulldown();

  function createPrefixPulldown() {
    const prefixSelect = document.getElementById("prefix");
    prefixList.forEach(item => {
      const option = document.createElement("option");
      const value = item.name;
      option.value = value.toLowerCase();
      option.textContent = `${item.icon} ${item.name}: ${item.description}`;
      if (value.toLowerCase() === "feature") {
        option.selected = true;
      }
      prefixSelect.appendChild(option);
    });
  }
  
  
  const generateBtn = document.getElementById("btn-generate");
  
  generateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputData = getInput();
    const outputArea = document.getElementById("message-output");
    outputArea.value = inputData.getMessage();
  });
  
  function getInput() {
    const commitForm = document.forms["commitForm"];
    const prefixOption = commitForm["prefixOption"].value;

    let prefix = "";

    // prefixListから、合致するものをひっぱりだしてきて、オブジェクトをprefixに代入する
    prefixList.forEach((element, i) => {
      if (element.name.toLowerCase() === prefixOption) {
        prefix = prefixList[i]
      }
    });

    const subject = commitForm["subject"].value;
    const comment = commitForm["comment"].value;
    const issue = commitForm["issue"].value;

    const inputData = new data(
      prefix.getPrefixIcon(),
      prefix.getPrefixName(),
      subject,
      comment,
      issue,
    );

    return inputData;
  }

  const copyBtn = document.getElementById("btn-copy");

  copyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const text = document.getElementById("message-output").value;
    navigator.clipboard.writeText(text);
    copyBtn.textContent = "CLIPED!";
    setTimeout(() => {
      copyBtn.textContent = "COPY";
    },
      1000);
  });



} // end