import React from "react";
import LanguagesDropdown from "./LanguageDropdown";
import ThemeDropdown from "./ThemeDropdown";
import CodeEditorWindow from "./CodeEditorWindow";

const LeftPanel = ({leftWidth, onSelectChange, handleThemeChange, code, onChange, language, theme, isThemeLoading}) => {
  return (
    <div
      className="h-inherit  text-white flex items-center justify-center bg-panel overflow-scroll"
      style={{ width: `${leftWidth}%`, minWidth: "20%", maxWidth: "80%" }}
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex w-full m-4 gap-4">
          <LanguagesDropdown onSelectChange={onSelectChange} />
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
        {isThemeLoading ? (
          <div>Loading theme...</div>
        ) : (
          <div>
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme.value}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftPanel;
