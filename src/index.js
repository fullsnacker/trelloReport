const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "../data/export.json");

let result = "Date,Time,Card,List Before,List After\n";

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err.message);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    const actions = jsonData.actions;
    actions.map((action) => {
      if (action.type === "updateCard" && action.data.listBefore) {
        result += `${new Date(action.date).toLocaleDateString(
          "es-ES"
        )},${new Date(action.date).toLocaleTimeString("es-ES")},${
          action.data.card.name
        },${action.data.listBefore.name},${action.data.listAfter.name}\n`;
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
