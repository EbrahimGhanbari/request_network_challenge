import React from "react";
import "./Grades.scss";

export default function Grades(prop) {
  const { isCollapsed, row, index } = prop;
  return (
    <>
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
    </>
  );
}
