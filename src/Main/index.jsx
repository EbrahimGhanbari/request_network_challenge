import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Grades from "./Grades";
import Tag from "./Tag";
import CollapseButton from "./CollapseButton";
import axios from "axios";
import "./Main.scss";

const averageCalculator = (array) => {
  const sum = array.reduce((a, c) => parseFloat(a) + parseFloat(c));
  return sum / array.length;
};
export default function Main() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState([]);
  const [SearchInput, setSearchInput] = useState([]);

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

  return (
    <div className="main">
      <SearchBar
        searchField={["firstName", "lastName"]}
        SearchInput={SearchInput}
        setSearchInput={setSearchInput}
        setFilteredData={setFilteredData}
        data={data}
        placeHolder="Search by name"
      />
      <SearchBar
        searchField={["tags"]}
        SearchInput={SearchInput}
        setSearchInput={setSearchInput}
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
                <Tag
                  row={row}
                  data={data}
                  setFilteredData={setFilteredData}
                  setData={setData}
                  index={index}
                />
                <Grades row={row} isCollapsed={isCollapsed} index={index} />
              </div>
              <CollapseButton
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                index={index}
              />
            </section>
          </div>
        );
      })}
    </div>
  );
}
