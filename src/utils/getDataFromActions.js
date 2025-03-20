const getDataFromActions = (actions) => {
  let result = "Date,Time,Card,Type,Description,Elapsed Time\n";
  actions.map((action) => {
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
  return result;
};

module.exports = getDataFromActions;
