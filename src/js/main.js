'use strict';
{
  const url = "./data/data.json";

  class JsonData {
    constructor(url) {
      this.url = url;
      this.data = null;
      this.dataPromise = null;
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

    getPrefixType() {
      if (this.data) {
        console.log("Processing data:", this.data);
      } else {
        console.log("Data is not loaded yey");
      }
    }

  }



  const jsonData = new JsonData(url);

  jsonData.loadData().then(() => {
    jsonData.getPrefixType();
  });


  const getPrifixType = async() => {
    const prefixList = await fetchData2();
    const eachPrefix = prefixList.map((item) => {
      return item.displayName;
    });
    console.log(eachPrefix);
  };
  // getPrifixType();



} // end