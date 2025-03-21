const fs = require("fs");
const getLast30DaysActions = require("./utils/getLast30DaysActions");
const getDataFromActions = require("./utils/getDataFromActions");
const writeToFile = require("./utils/writeToFile");

//const initialDate = new Date("2025-03-21 00:00:00");
const initialDate = new Date("2025-01-01 00:00:00");

const reportFile = (filePath) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err.message);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const allActions = jsonData.actions;
      // const actionsLast30Days = getLast30DaysActions(allActions);
      const actionsSinceInit = allActions.filter(
        (action) => new Date(action.date) > initialDate
      );
      const result = getDataFromActions(actionsSinceInit);
      console.log(result);
      writeToFile(result);
    } catch (parseErr) {
      console.error("Error parsing JSON:", parseErr.message);
    }
  });
};

module.exports = reportFile;
