import React, { useState, useRef, useEffect } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import LanguagesDropdown from "./LanguageDropdown";
import ThemeDropdown from "./ThemeDropdown";

import useKeyPress from "../hooks/useKeyPress";
import { javascriptDefault } from "../constants/defaultCode";
import { languageOptions } from "../constants/languageOptions";
import { defineTheme } from "../lib/defineTheme";

const ResizablePanel = () => {
  const [leftWidth, setLeftWidth] = useState(50);
  const resizerRef = useRef(null);
  const isResizing = useRef(false);

  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    // We will come to the implementation later in the code
  };

  const checkStatus = async (token) => {
    // We will come to the implementation later in the code
  };

  function handleThemeChange(th) {
    // We will come to the implementation later in the code
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }

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
        className="h-full text-white flex items-center justify-center bg-gray-600"
        style={{ width: `${leftWidth}%`, minWidth: "20%", maxWidth: "80%" }}
      >
        <div className="flex flex-col w-full h-full">
            <div className="flex w-full m-4 gap-4">
                <LanguagesDropdown 
                    onSelectChange={onSelectChange}
                />
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
