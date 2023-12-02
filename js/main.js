'use strict';
{
  // CLASSへ変更

  class prefix {
    constructor(name, icon ,description) {
      this.name = name;
      this.icon = icon;
      this.description = description;
    }

    showData() {
      return `${this.name}, ${this.icon}, ${this.description}`;
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
    messageOutput();
  });

  function getInput() {
    const commitForm = document.forms["commitForm"];
  
    const subject = commitForm["subject"].value;
    const prefixOption = commitForm["prefixOption"].value;
    const commentSwitch = commitForm["commentSwitch"].value;
    const comment = commitForm["comment"].value;
    const issue = commitForm["issue"].value;

    return { subject, prefixOption, commentSwitch, comment, issue };
  }


  function messageOutput() {
    const { subject, prefixOption, commentSwitch, comment, issue } = getInput();
    console.log(subject);
    console.log(prefixOption);
    console.log(commentSwitch);
    console.log(comment);
    console.log(issue);

    const messageOutputTarget = document.getElementById("message-output");
    console.log(messageOutputTarget.value);

    if (commentSwitch === "true") {
      console.log("on");

      messageOutputTarget.value = `git commit -m "${prefixOption} FEATURE: ${subject} (${issue})" -m "${comment}"`;

    } else {
      console.log("off");

      messageOutputTarget.value = `git commit -m "${prefixOption} FEATURE: ${subject} (${issue})" -m "${comment}"`;

    }
  }

  
  



  // const generatedMessage = commitForm["generatedMessage"];
  // console.log(generatedMessage.value);
}