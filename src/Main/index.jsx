import React, { useState, useEffect } from "react";
import { ImPlus, ImMinus } from "react-icons/im";
import SearchBar from "./SearchBar";
import Grades from "./Grades";
import Tag from "./Tag";
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
    <div className="main">
      <SearchBar
        searchField={["firstName", "lastName"]}
        setFilteredData={setFilteredData}
        data={data}
        placeHolder="Search by name"
      />
      <SearchBar
        searchField={["tags"]}
        setFilteredData={setFilteredData}
        data={data}
        placeHolder="Search by tag"
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
                {/* <>
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
                </> */}
                <Tag
                  row={row}
                  data={data}
                  setFilteredData={setFilteredData}
                  setData={setData}
                  index={index}
                />
                <Grades row={row} isCollapsed={isCollapsed} index={index} />
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
