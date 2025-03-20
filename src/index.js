const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "../data/export.json");

let result = "Date,Time,Card,Type,Description,Elapsed Time\n";
// let result = "";

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err.message);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    const allActions = jsonData.actions;

    //Get actions created in the last 30 days
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    const actionsLast30Days = allActions.filter(
      (action) => new Date(action.date) > last30Days
    );

    // Loop through the actions and create the CSV
    actionsLast30Days.map((action) => {
      if (action.type === "updateCard" && action.data.listBefore) {
        result += `${new Date(action.date).toLocaleDateString(
          "es-ES"
        )},${new Date(action.date).toLocaleTimeString("es-ES")},${
          action.data.card.name
        },changeList,From '${action.data.listBefore.name}' To '${
          action.data.listAfter.name
        }'\n`;
      } else if (action.type === "commentCard") {
        result += `${new Date(action.date).toLocaleDateString(
          "es-ES"
        )},${new Date(action.date).toLocaleTimeString("es-ES")},${
          action.data.card.name
        },comment,'${action.data.text}'\n`;
      } else if (action.type === "createCard") {
        result += `${new Date(action.date).toLocaleDateString(
          "es-ES"
        )},${new Date(action.date).toLocaleTimeString("es-ES")},${
          action.data.card.name
        },createCard\n`;
      }
    });

    // console.log(result);
    // Write the result to a new file
    fs.writeFile(
      path.resolve(__dirname, "../data/result.csv"),
      result,
      (err) => {
        if (err) {
          console.error("Error writing the file:", err.message);
          return;
        }
        console.log("File written successfully!");
      }
    );
  } catch (parseErr) {
    console.error("Error parsing JSON:", parseErr.message);
  }
});
