import React, { useState, useRef, useEffect } from "react";

const ResizablePanel = () => {
  const [leftWidth, setLeftWidth] = useState(50);
  const resizerRef = useRef(null);
  const isResizing = useRef(false);

  const handleMouseDown = () => {
    isResizing.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    const containerWidth = window.innerWidth;
    const newLeftWidth = (e.clientX / containerWidth) * 100;
    if (newLeftWidth > 20 && newLeftWidth < 80) {
      setLeftWidth(newLeftWidth);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div
        className="bg-blue-500 h-full text-white flex items-center justify-center bg-gray-600"
        style={{ width: `${leftWidth}%`, minWidth: "20%", maxWidth: "80%" }}
      >
        Left Panel
      </div>

      {/* Resizer */}
      <div
        className="w-1 mx-0.5 h-full bg-gray-600 cursor-ew-resize rounded-md hover:bg-blue-400 active:bg-blue-400"
        ref={resizerRef}
        onMouseDown={handleMouseDown}
      ></div>

      {/* Right Panel */}
      <div className="bg-gray-600 h-full flex-1 flex items-center justify-center">
       <div className="bg-blue">
        Right Panel
       </div>
      </div>
    </div>
  );
};

export default ResizablePanel;
