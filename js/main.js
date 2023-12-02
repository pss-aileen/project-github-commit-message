'use strict';
{

  // データのクラスを作る？

  class data {
    constructor(prefix, subject, comment, issueRequired, issue) {
      this.prefix = prefix;
      this.subject = subject;
      this.comment = comment;
      this.issueRequired = issueRequired.toLowerCase() === "true";
      this.issue = issue;
    }
    
    getMessage() {
      let message = "";

      message = message + this.getCommitStartSentence();

      const IssueAndMessage = this.issueRequired && this.comment;
      const IssueAndNoMessage = this.issueRequired && !this.comment;
      const NoIssueAndMessage = !this.issueRequired && this.comment;
      const NoIssueAndNoMessage = !this.issueRequired && !this.comment;

      if (IssueAndMessage) {
        console.log("issue番号必要、コメントあり");
        message = message + this.getCommitFirstLineWithIssue() + this.getCommitSecondLine();
      } else if (IssueAndNoMessage) {
        console.log("issue番号必要、コメントなし");
        message = message + this.getCommitFirstLineWithIssue();
      } else if (NoIssueAndMessage) {
        console.log("issue番号不要、コメントあり");
        message = message + this.getCommitFirstLine() + this.getCommitSecondLine();
      } else if (NoIssueAndNoMessage) {
        console.log("issue番号不要、コメントなし");
        message = message + this.getCommitFirstLine();
      }

      // console.log(message);
    }

    getCommitStartSentence() {
      return "git commit"
    }

    getCommitFirstLine() {
      return ` -m "${this.prefix.icon} ${this.prefix.name}: ${this.subject}"`;
    }

    getCommitFirstLineWithIssue() {
      return ` -m "${this.prefix.icon} ${this.prefix.name}: ${this.subject} (#${this.issue})"`;
    }

    getCommitSecondLine() {
      return ` -m "${this.comment}"`;
    }
  }

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


  /**********************************
    PREFIX LIST
  **********************************/
  
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
      prefixSelect.appendChild(option);
    });
  }
  
  
  const generateBtn = document.getElementById("btn-generate");
  
  generateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputData = getInput();
    console.log(inputData.getMessage());
  });
  
  function getInput() {
    const commitForm = document.forms["commitForm"];
    
    const prefixOption = commitForm["prefixOption"].value;
    const subject = commitForm["subject"].value;
    const comment = commitForm["comment"].value;
    const issue = commitForm["issue"].value;
    const issueSwitch = commitForm["issueSwitch"].value;

    const inputData = new data(
      prefixOption,
      subject,
      comment,
      issueSwitch,
      issue,
    );

    return inputData;
  }
}