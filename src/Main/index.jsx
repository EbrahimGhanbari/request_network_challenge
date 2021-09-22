import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Grades from "./Grades";
import Tag from "./Tag";
import CollapseButton from "./CollapseButton";
import axios from "axios";
import "./Main.scss";
import { dataFiltering, averageCalculator } from "./helperFunctions";

export default function Main() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState([]);
  const [nameSearchInput, setNameSearchInput] = useState("");
  const [tagSearchInput, setTagSearchInput] = useState("");

  useEffect(() => {
    const result = data.filter((data) => {
      return (
        dataFiltering(data, ["firstName", "lastName"], nameSearchInput) &&
        dataFiltering(data, ["tags"], tagSearchInput)
      );
    });
    setFilteredData(result);
  }, [nameSearchInput, tagSearchInput]);

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
        setSearchInput={setNameSearchInput}
        placeHolder="Search by name"
      />
      <SearchBar
        setSearchInput={setTagSearchInput}
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
