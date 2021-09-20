import React from "react";
import { ImPlus, ImMinus } from "react-icons/im";

const iconSize = 24;

export default function CollapseButton(prop) {
  const { isCollapsed, setIsCollapsed, index } = prop;
  const collapseHandler = (index) => {
    isCollapsed.includes(index)
      ? setIsCollapsed(isCollapsed.filter((item) => item !== index))
      : setIsCollapsed([...isCollapsed, index]);
  };

  return (
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
  );
}
