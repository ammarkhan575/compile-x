import React from "react";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import Resizer from "./Resizer";

const RightPanel = ({
  topHeight,
  outputDetails,
  verticalResizerRef,
  handleMouseDown,
  customInput,
  setCustomInput,
  handleCompile,
  processing
}) => {
  return (
    <div className=" op h-full flex-1 flex flex-col">
      <div
        className="bg-panel p-4 h-full overflow-y-scroll"
        style={{
          height: `${topHeight}%`,
          minHeight: "30%",
          maxHeight: "70%"
        }}
      >
        <OutputWindow outputDetails={outputDetails} />
        <button className="bg-[#383838] px-4 py-1 rounded-md text-[#29C244] shadow-[5px_5px_0px_0px_rgba(0,0,0)] hover:shadow transition duration-200 border border-black mt-2 justify-end" onClick={handleCompile}>
          {processing ? "Processing" : "▶️ Run"}
        </button>
      </div>

      <Resizer type="vertical" onMouseDown={handleMouseDown} />

      <div className="p-4 flex-1 bg-panel overflow-scroll">
        <CustomInput
          customInput={customInput}
          setCustomInput={setCustomInput}
        />
      </div>
    </div>
  );
};

export default RightPanel;
