import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useKeyPress from "../hooks/useKeyPress";
import { javascriptDefault } from "../constants/defaultCode";
import { languageOptions } from "../constants/languageOptions";
import { defineTheme } from "../lib/defineTheme";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import Resizer from "./Resizer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (msg) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput)
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY
      },
      data: formData
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY
      }
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
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
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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

        <Resizer type="horizontal" onMouseDown={handleMouseDown} />

        <RightPanel
          topHeight={topHeight}
          outputDetails={outputDetails}
          verticalResizerRef={verticalResizerRef}
          handleMouseDown={handleMouseDown}
          customInput={customInput}
          setCustomInput={setCustomInput}
        />
      </div>
    </>
  );
};

export default ResizablePanel;
