import React from "react";
import "./SearchBar.scss";

const filterFunction = (data, searchKeys, userInput) => {
  //if search bar empty show all data
  if (userInput.length === 0) return true;

  //create an array of item to be searched through
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

export default function TagBar(prop) {
  const { data, setFilteredData, placeHolder, searchField } = prop;
  const handleSearch = (event) => {
    let userInput = event.target.value.toLowerCase();
    let result = [];
    result = data.filter((data) => {
      return filterFunction(data, searchField, userInput);
    });

    setFilteredData(result);
  };

  return (
    <input
      className="search input-bar"
      type="text"
      onChange={(event) => handleSearch(event)}
      placeholder={placeHolder}
    ></input>
  );
}
