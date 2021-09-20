import React from "react";
// import "./Tag.scss";

export default function Tag(prop) {
  const { row, data, setFilteredData, setData, index } = prop;

  //!! Typically you want to save the tags in the DB !!
  // Add the tags to the data
  const submitTag = (event, index) => {
    const newData = [...data];
    const tag = event.target.value;
    if (!newData[index].tags) {
      newData[index].tags = [tag];
    } else {
      newData[index].tags.push(tag);
    }
    setData(newData);
    setFilteredData(newData);

    //Clear the input
    event.target.value = "";
  };

  return (
    <>
      {row.tags &&
        row.tags.map((tag, index) => {
          return <span key={index}>{tag}</span>;
        })}
      <div>
        <input
          type="text"
          onKeyDown={(event) =>
            event.key === "Enter" && submitTag(event, index)
          }
          className="tag-input input-bar"
          placeholder="Add a tag"
        ></input>
      </div>
    </>
  );
}
