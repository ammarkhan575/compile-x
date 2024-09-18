import React from "react";

const Resizer = ({ type, onMouseDown, customCSS }) => {
  const isHorizontal = type === "horizontal";

  return (
    <div
      className={`${
        isHorizontal ? "w-1 px-0.5 h-full" : "h-1 py-0.5 w-full"
      } bg-panelbody hover:bg-gray-300 active:bg-gray-300 cursor-${
        isHorizontal ? "ew" : "ns"
      }-resize rounded-md ${customCSS}`}
      onMouseDown={(e) => onMouseDown(e, type)}
    ></div>
  );
};

export default Resizer;
