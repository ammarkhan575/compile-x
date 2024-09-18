import React, { useState, useRef, useEffect } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import LanguagesDropdown from "./LanguageDropdown";
import ThemeDropdown from "./ThemeDropdown";

import useKeyPress from "../hooks/useKeyPress";
import { javascriptDefault } from "../constants/defaultCode";
import { languageOptions } from "../constants/languageOptions";
import { defineTheme } from "../lib/defineTheme";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";

const ResizablePanel = () => {
  const [leftWidth, setLeftWidth] = useState(50);
  const [topHeight, setTopHeight] = useState(50);
  const resizerRef = useRef(null);
  const verticalResizerRef = useRef(null);
  const isResizing = useRef(false);
  const isVerticalResizing = useRef(false);

  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState({
    value: "oceanic-next",
    label: "Oceanic Next"
  });
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onChange = (action, data) => {
    if (action === "code") {
      setCode(data);
    } else {
      console.warn("Unhandled action:", action, data);
    }
  };

  const handleCompile = () => {
    // We will come to the implementation later in the code
  };

  const checkStatus = async (token) => {
    // We will come to the implementation later in the code
  };

  const handleThemeChange = (th) => {
    if (["light", "vs-dark"].includes(th.value)) {
      setTheme(th);
    } else {
      defineTheme(th.value).then(() => setTheme(th));
    }
  };

  useEffect(() => {
    defineTheme("oceanic-next").then(() =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const handleMouseDown = (e, type) => {
    e.preventDefault();

    if (type === "horizontal") {
      isResizing.current = true;
    } else if (type === "vertical") {
      isVerticalResizing.current = true;
    }
  };

  const handleMouseMove = (e) => {
    e.preventDefault();

    if (isResizing.current) {
      const containerWidth = window.innerWidth;
      const newLeftWidth = (e.clientX / containerWidth) * 100;
      if (newLeftWidth > 20 && newLeftWidth < 80) {
        setLeftWidth(newLeftWidth);
      }
    }

    if (isVerticalResizing.current) {
      const containerHeight = window.innerHeight;
      const newTopHeight = (e.clientY / containerHeight) * 100;
      if (newTopHeight > 30 && newTopHeight < 70) {
        setTopHeight(newTopHeight);
      }
    }
  };

  const handleMouseUp = (e) => {
    e.preventDefault();

    isResizing.current = false;
    isVerticalResizing.current = false;
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
    <div className="flex h-full">
      {/* Left Panel */}
      <div
        className="h-inherit  text-white flex items-center justify-center bg-panel overflow-scroll"
        style={{ width: `${leftWidth}%`, minWidth: "20%", maxWidth: "80%" }}
      >
        <div className="flex flex-col w-full h-full">
          <div className="flex w-full m-4 gap-4">
            <LanguagesDropdown onSelectChange={onSelectChange} />
            <ThemeDropdown
              handleThemeChange={handleThemeChange}
              theme={theme}
            />
          </div>
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </div>
      </div>

      {/* Horizontal Resizer */}
      <div
        className="w-1 px-0.5 h-full bg-panelbody hover:bg-gray-300 active:bg-gray-300 cursor-ew-resize rounded-md"
        ref={resizerRef}
        onMouseDown={(e) => handleMouseDown(e, "horizontal")}
      ></div>

      {/* Right Panel */}
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

        {/* Vertical Resizer */}
        <div
          className="h-1 py-0.5 w-full bg-panelbody hover:bg-gray-300 active:bg-gray-300 cursor-ns-resize  rounded-md "
          ref={verticalResizerRef}
          onMouseDown={(e) => handleMouseDown(e, "vertical")}
        ></div>

        <div className="p-4 flex-1 bg-panel overflow-scroll">
          <CustomInput
            customInput={customInput}
            setCustomInput={setCustomInput}
          />
        </div>
      </div>
    </div>
  );
};

export default ResizablePanel;
