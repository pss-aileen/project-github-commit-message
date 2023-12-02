'use strict';
{

  const generateBtn = document.getElementById("btn-generate");

  generateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getInput();
  });

  function getInput() {
    const commitForm = document.forms["commitForm"];
  
    const subject = commitForm["subject"].value;
    const prefixOption = commitForm["prefixOption"].value;
    const commentSwitch = commitForm["commentSwitch"].value;
    const comment = commitForm["comment"].value;
    const issue = commitForm["issue"].value;
  
    // console.log(prefixOption);
    // console.log(subject);
    // console.log(commentSwitch);
    // console.log(comment);
    // console.log(issue);

    return { subject, prefixOption, commentSwitch, comment, issue };
  }

  messageOutput();

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

  
  
  const feature = {
    name: "FEATURE",
    icon: "💕",
    description: "メソッド、条件分岐、改良、ファイル追加した時"
  }

  const refactor = {
    name: "REFACTOR",
    icon: "🫶",
    description: "機能を変えずにコードを書き換えた時"
  }

  const docs = {
    name: "DOCS",
    icon: "📖",
    description: "コードに関係ない、影響がない時"
  }

  const fix = {
    name: "FIX",
    icon: "🐝",
    description: "不具合の修正"
  }

  const release = {
    name: "RELEASE",
    icon: "🔖",
    description: "Version 1.0.0"
  }

  const newProject = {
    name: "NEW",
    icon: "🎉",
    description: "BEGIN NEW PROJECT"
  }

  const prefixList = [
    feature,
    refactor,
    docs,
    fix,
    release,
    newProject,
  ];

  console.log(prefixList);

  // const generatedMessage = commitForm["generatedMessage"];
  // console.log(generatedMessage.value);
}