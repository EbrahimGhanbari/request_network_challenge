import React, { useState, useEffect, useRef } from "react";
import { ImPlus, ImMinus } from "react-icons/im";
import SearchBar from "./SearchBar";
import axios from "axios";
import "./Main.scss";

const averageCalculator = (array) => {
  const sum = array.reduce((a, c) => parseFloat(a) + parseFloat(c));
  return sum / array.length;
};
const iconSize = 24;
export default function Main() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState([]);
  const [tags, setTags] = useState([]);
  const inputTag = useRef(null);

  useEffect(() => {
    axios
      .get(`https://api.hatchways.io/assessment/students`)
      .then((response) => {
        setData(response.data.students);
        setFilteredData(response.data.students);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const collapseHandler = (index) => {
    isCollapsed.includes(index)
      ? setIsCollapsed(isCollapsed.filter((item) => item !== index))
      : setIsCollapsed([...isCollapsed, index]);
  };

  const submitTag = (event) => {
    event.preventDefault();
    // if (event.keyCode === 13) {
    //   console.log("event.target.value");
    // }
    console.log(inputTag.current);
  };

  return (
    <div className="main">
      <SearchBar
        setFilteredData={setFilteredData}
        data={data}
        placeHolder="Search by name"
      />
      {filteredData.map((row, index) => {
        return (
          <div key={index}>
            <section>
              <img src={row.pic} alt={row.lastName} />
              <div className="element-text">
                <h1>{`${row.firstName} ${row.lastName}`.toUpperCase()}</h1>
                <p>Email: {row.email}</p>
                <p>Company: {row.company}</p>
                <p>Skill: {row.skill}</p>
                <p>Average: {averageCalculator(row.grades)}%</p>
                <span>tag10</span>
                <form onSubmit={(event) => submitTag(event)}>
                  <input
                    type="text"
                    ref={inputTag}
                    className="tag-input input-bar"
                    placeholder="Add a tag"
                  ></input>
                </form>
                {isCollapsed.includes(index) ? (
                  <div className="grades">
                    {row.grades.map((grade, index) => {
                      return (
                        <div key={index}>
                          <p> {`Test ${index + 1}`}</p>
                          <p> {grade}%</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <button
                onClick={() => {
                  collapseHandler(index);
                }}
              >
                {isCollapsed.includes(index) ? (
                  <ImMinus size={iconSize} />
                ) : (
                  <ImPlus size={iconSize} />
                )}
              </button>
            </section>
          </div>
        );
      })}
    </div>
  );
}
