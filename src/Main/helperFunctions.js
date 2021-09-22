// This function analyze the user input in search bar and return boolean
const dataFiltering = (data, searchKeys, userInput) => {
  //if search bar empty show all data
  if (userInput.length === 0) return true;

  const searchItems = [];

  for (let key of searchKeys) {
    if (data[key] === undefined) continue;

    if (typeof data[key] === "object") {
      searchItems.push(...data[key]);
    } else {
      searchItems.push(data[key]);
    }
  }

  for (let item of searchItems)
    if (item.toLowerCase().slice(0, userInput.length).search(userInput) !== -1)
      return true;

  return false;
};

const averageCalculator = (array) => {
  const sum = array.reduce((a, c) => parseFloat(a) + parseFloat(c));
  return sum / array.length;
};

export { dataFiltering, averageCalculator };
