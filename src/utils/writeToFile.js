const path = require("path");
const fs = require("fs");

const writeToFile = (result) => {
  fs.writeFile(
    path.resolve(__dirname, "../../data/result.csv"),
    result,
    (err) => {
      if (err) {
        console.error("Error writing the file:", err.message);
        return;
      }
      console.log("File written successfully!");
    }
  );
};

module.exports = writeToFile;
