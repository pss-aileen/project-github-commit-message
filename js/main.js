'use strict';
{
  
  /************************************************************
    プロジェクトを追加したい時
    - HTMLでTYPEのoptionを追加
    - class Prefixでインスタンスを作成
    - プロジェクトのPREFIX LISTを作成
    - class TypeのgetType()で配列を返す
    以上で完了！
  ************************************************************/

  /************************************************************
    CLASS DATA
    コミットメッセージとして出力されるインスタンスを作る（最終データ）
  ************************************************************/
  
  class Data {
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

  
  /************************************************************
    CLASS PREFIX
    PREFIXを登録、インスタンスするためのCLASS
  ************************************************************/
  
  class Prefix {
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

  /************************************************************
    PREFIXのインスタンス
    CLASS PREFIXでCOMMIT MESSAGEに必要なものを準備、配列に入れる
  ************************************************************/

  const normalPrefixList = [];
  CreateNormalPrefix();
  function CreateNormalPrefix() {
    const feature = new Prefix("FEAT", "💕", "メソッド、条件分岐、改良、ファイル追加した時");
    const refactor = new Prefix("REFACTOR", "🫶", "機能を変えずにコードを書き換えた時");
    const docs = new Prefix("DOCS", "📝", "コードに関係ない、影響がない時");
    const fix = new Prefix("FIX", "🐝", "不具合の修正");
    const release = new Prefix("RELEASE", "🚀", "Version 1.0.0");
    const newProject = new Prefix("NEW", "🎉", "BEGIN NEW PROJECT");
    
    normalPrefixList.push(feature, refactor, docs, fix, release, newProject);
  }

  const TILPrefixList = [];
  CreateTILPrefix();
  function CreateTILPrefix() {
    const update = new Prefix("UPDATE", "📚", "DAILY REPORT 231201");
    
    TILPrefixList.push(update);
  }

  const practiceProjectPrefixList = [];
  CreatePracticeProjectPrefix();
  function CreatePracticeProjectPrefix() {
    const add = new Prefix("ADD", "📖", "ファイル、学んだことの追加");
    
    practiceProjectPrefixList.push(add);
  }


  /************************************************************
    TYPEを取得する
    TYPEを取得して、それに応じたPREFIXをセットする
  ************************************************************/
  
  class Type {
    constructor(value) {
      this.value = value;
    }

    getTypeArray() {
      // 取得したTYPEによって、PREFIXの配列を返す
      // HTMLのValueと配列名は同じにする
      if (this.value === "normalPrefixList") {
        return normalPrefixList;
      }
      
      if (this.value === "TILPrefixList") {
        return TILPrefixList;
      }

      if (this.value === "practiceProjectPrefixList") {
        return practiceProjectPrefixList;
      }
      
      return "NO ARRAY";
    }
  }
  
  getType();

  function getType() {
    let type;
    const typeSelect = document.getElementById("type");
    const initType = typeSelect.value;
    type = new Type(initType);
    createPrefixPulldown(type.getTypeArray());

    typeSelect.addEventListener("change", () => {
      type = new Type(typeSelect.value);
      createPrefixPulldown(type.getTypeArray());
    });

    const generateBtn = document.getElementById("btn-generate");
  
    generateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const inputData = getInput(type.getTypeArray());
      const outputArea = document.getElementById("message-output");
      outputArea.value = inputData.getMessage();
    });
  }


  /************************************************************
    プルダウンを作る
    TYPEの種類によって、PREFIXに配列の一覧を展開する
  ************************************************************/

  // createPrefixPulldown();

  function createPrefixPulldown(prefixArray) {
    const prefixSelect = document.getElementById("prefix");

    // プルダウン初期化
    while (prefixSelect.firstChild) {
      prefixSelect.removeChild(prefixSelect.firstChild);
    }

    prefixArray.forEach((item, index) => {
      const option = document.createElement("option");
      const value = item.name;
      option.value = value.toLowerCase();
      option.textContent = `${item.icon} ${item.name}: ${item.description}`;
      if (index === 0) {
        option.selected = true;
      }
      prefixSelect.appendChild(option);
    });


    prefixChangeEvent();

  }

  function prefixChangeEvent() {
    const selectElement = document.getElementById("prefix");
    setSpecificSubject(selectElement.value);
    
    selectElement.addEventListener("change", () => {
      setSpecificSubject(selectElement.value);
    });
  }

  
  function setSpecificSubject(prefix) {
    const subjectElement = document.getElementById("subject");
    
    if (prefix === "update") {
      const day = new Date()
      subjectElement.value = `DAILY REPORT ${day.getFullYear() - 2000}${String(day.getMonth() + 1).padStart(2, "0")}${String(day.getDate()).padStart(2, "0")}`;
    } else {
      subjectElement.value = "";
    }
  }
  
  
  /************************************************************
    コミットメッセージを生成する
    それ関連の処理
  ************************************************************/
  
  function getInput(prefixArray) {
    const commitForm = document.forms["commitForm"];
    const prefixValue = commitForm["prefix"].value;

    let prefix = "";

    prefixArray.forEach((element, i) => {
      if (element.name.toLowerCase() === prefixValue) {
        prefix = prefixArray[i];
      }
    });

    const subject = commitForm["subject"].value;
    const comment = commitForm["comment"].value;
    const issue = commitForm["issue"].value;

    const inputData = new Data(
      prefix.getPrefixIcon(),
      prefix.getPrefixName(),
      subject,
      comment,
      issue,
    );

    return inputData;
  }


  /************************************************************
    コミットメッセージをコピーする
    それ関連の処理
  ************************************************************/
  
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

  /************************************************************
    リセット
    入力内容を全てリセットする
  ************************************************************/

  const resetBtn = document.getElementById("btn-reset");

  resetBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const commitForm = document.forms["commitForm"];

    commitForm["subject"].value = "";
    commitForm["comment"].value = "";
    commitForm["issue"].value = "";
    document.getElementById("message-output").value = "🧙🪄";

  });

} // end