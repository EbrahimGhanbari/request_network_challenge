import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Main.scss";

const averageCalculator = (array) => {
  const sum = array.reduce((a, c) => parseFloat(a) + parseFloat(c));
  return sum / array.length;
};

export default function () {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.hatchways.io/assessment/students`)
      .then((response) => {
        setStudents(response.data.students);
      });
  }, []);

  console.log(students);
  return (
    <div className="main">
      {students.map((row) => {
        return (
          <section>
            <img src={row.pic} alt="Girl in a jacket" />
            <div>
              <h1>{`${row.firstName} ${row.lastName}`.toUpperCase()}</h1>
              <p>Email: {row.email}</p>
              <p>Company: {row.company}</p>
              <p>Skill: {row.skill}</p>
              <p>Average: {averageCalculator(row.grades)}%</p>
            </div>
          </section>
        );
      })}

      <p>click on a quote</p>
    </div>
  );
}
