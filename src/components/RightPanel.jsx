import React from 'react'
import OutputWindow from './OutputWindow';
import CustomInput from './CustomInput';
import Resizer from './Resizer';

const RightPanel = ({topHeight, outputDetails, verticalResizerRef, handleMouseDown, customInput, setCustomInput}) => {
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
        </div>

        <Resizer type="vertical" onMouseDown={handleMouseDown} />

        <div className="p-4 flex-1 bg-panel overflow-scroll">
          <CustomInput
            customInput={customInput}
            setCustomInput={setCustomInput}
          />
        </div>
      </div>
  )
}

export default RightPanel;