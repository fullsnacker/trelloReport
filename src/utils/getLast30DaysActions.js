const getLast30DaysActions = (allActions) => {
  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);
  return allActions.filter((action) => new Date(action.date) > last30Days);
};

module.exports = getLast30DaysActions;
