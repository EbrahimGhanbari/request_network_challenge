import React from "react";
import "./SearchBar.scss";

export default function TagBar(prop) {
  const { placeHolder, setSearchInput } = prop;

  return (
    <input
      className="search input-bar"
      type="text"
      onChange={(event) => setSearchInput(event.target.value.toLowerCase())}
      placeholder={placeHolder}
    ></input>
  );
}
