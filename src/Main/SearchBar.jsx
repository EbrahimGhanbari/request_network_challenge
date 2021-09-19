import React from "react";
import "./SearchBar.scss";

export default function SearchBar({ data, setFilteredData, placeHolder }) {
  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    result = data.filter((data) => {
      return (
        data.firstName.toLowerCase().slice(0, value.length).search(value) !==
          -1 ||
        data.lastName.toLowerCase().slice(0, value.length).search(value) !== -1
      );
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
