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

  
  
  

  // const generatedMessage = commitForm["generatedMessage"];
  // console.log(generatedMessage.value);
}