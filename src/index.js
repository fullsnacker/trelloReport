const path = require("path");
const reportFile = require("./reportFile");

const filePath = path.resolve(__dirname, "../data/export.json");

reportFile(filePath);
