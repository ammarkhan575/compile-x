import React, { useState, useRef, useEffect } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import LanguagesDropdown from "./LanguageDropdown";
import ThemeDropdown from "./ThemeDropdown";

import useKeyPress from "../hooks/useKeyPress";
import { javascriptDefault } from "../constants/defaultCode";
import { languageOptions } from "../constants/languageOptions";
import { defineTheme } from "../lib/defineTheme";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import Resizer from "./Resizer";

const ResizablePanel = () => {
  const [leftWidth, setLeftWidth] = useState(50);
  const [topHeight, setTopHeight] = useState(60);
  const resizerRef = useRef(null);
  const verticalResizerRef = useRef(null);
  const isResizing = useRef(false);
  const isVerticalResizing = useRef(false);

  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState({
    value: "blackboard",
    label: "Blackboard"
  });
  const [language, setLanguage] = useState(languageOptions[0]);

  const [isThemeLoading, setIsThemeLoading] = useState(true);

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
    setIsThemeLoading(true);
    if (["light", "vs-dark"].includes(th.value)) {
      setTheme(th);
      setIsThemeLoading(false);
    } else {
      defineTheme(th.value).then(() => {
        setTheme(th);
        setIsThemeLoading(false);
      });
    }
  };

  useEffect(() => {
    setIsThemeLoading(true);
    defineTheme("blackboard").then(() => {
      setTheme({ value: "blackboard", label: "Blackboard" });
      setIsThemeLoading(false);
    });
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
    <div className="flex h-full overflow-hidden">
      <LeftPanel
        leftWidth={leftWidth}
        onSelectChange={onSelectChange}
        handleThemeChange={handleThemeChange}
        code={code}
        onChange={onChange}
        language={language}
        theme={theme}
        isThemeLoading={isThemeLoading}
      />

      {/* Horizontal Resizer */}
      <Resizer type="horizontal" onMouseDown={handleMouseDown} />

      {/* Right Panel */}
      <RightPanel
        topHeight={topHeight}
        outputDetails={outputDetails}
        verticalResizerRef={verticalResizerRef}
        handleMouseDown={handleMouseDown}
        customInput={customInput}
        setCustomInput={setCustomInput}
      />
    </div>
  );
};

export default ResizablePanel;
