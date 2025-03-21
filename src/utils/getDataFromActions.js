const getDataFromActions = (actions) => {
  let result = "Date,Time,Card,Type,Description,Elapsed Time\n";
  actions.map((action) => {
    if (action.type === "updateCard") {
      if (action.data.listBefore) {
        result += `${new Date(action.date).toLocaleDateString(
          "es-ES"
        )},${new Date(action.date).toLocaleTimeString("es-ES")},${
          action.data.card.name
        },changeList,From '${action.data.listBefore.name}' To '${
          action.data.listAfter.name
        }'\n`;
      }
      if (action.data.old?.due) {
        result += `${new Date(action.date).toLocaleDateString(
          "es-ES"
        )},${new Date(action.date).toLocaleTimeString("es-ES")},${
          action.data.card.name
        },reprogram,From '${new Date(action.data.old.due).toLocaleDateString(
          "es-ES"
        )} ${new Date(action.data.old.due).toLocaleTimeString(
          "es-ES"
        )}' To '${new Date(action.data.card.due).toLocaleDateString(
          "es-ES"
        )} ${new Date(action.data.card.due).toLocaleTimeString("es-ES")}'\n`;
      } else if (
        action.data.old?.due === null &&
        action.data.card.due != null
      ) {
        result += `${new Date(action.date).toLocaleDateString(
          "es-ES"
        )},${new Date(action.date).toLocaleTimeString("es-ES")},${
          action.data.card.name
        },assignDate\,Date: ${new Date(action.data.card.due).toLocaleDateString(
          "es-ES"
        )} ${new Date(action.data.card.due).toLocaleTimeString("es-ES")}\n`;
      }
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
