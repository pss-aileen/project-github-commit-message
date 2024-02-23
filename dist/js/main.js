'use strict';
{

  class JsonData {
    constructor(url) {
      this.url = url;
      this.data = null;
    }

    async loadData() {
      try {
        const response = await fetch(this.url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        this.data = await response.json();
        console.log("Data loaded successfully");
      } catch (error) {
        console.error('Error loading JSON data:', error);
      }
    }

    
  }
  
  const fetchData = async () => {
    const res = await fetch("./data/data.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("NG");
        }
        return response.json();
      })
      .catch(error => {
        console.error("no data");
        return "no data";
      })
  };

  const fetchData2 = async () => {
    return new Promise((resolve, reject) => {
      fetch("./data/data.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("NG");
        }
        resolve(response.json());
      })
      .catch(error => {
        console.error("no data");
        reject("no data");
      })
    });
  }


  const getPrifixType = async() => {
    const prefixList = await fetchData2();
    const eachPrefix = prefixList.map((item) => {
      return item.displayName;
    });
    console.log(eachPrefix);
  };
  getPrifixType();



} // end