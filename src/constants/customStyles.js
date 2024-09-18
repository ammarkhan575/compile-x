export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    maxWidth: "14rem",
    minWidth: "12rem",
    borderRadius: "5px",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
    backgroundColor: "#00000",
    cursor: "pointer",
    border: "2px solid #000000",
    boxShadow: "5px 5px 0px 0px rgba(0,0,0);",
    ":hover": {
      border: "2px solid #000000",
      boxShadow: "none"
    }
  }),
  option: (styles) => {
    return {
      ...styles,
      color: "#99A0AC",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      width: "100%",
      borderBottom: "1px solid #262626",
      backgroundColor: "#333333",
      ":hover": {
        color: "white",
        cursor: "pointer"
      }
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      maxWidth: "14rem",
      backgroundColor: "#333333",
      border: "2px solid #000000",
      borderRadius: "5px",
      boxShadow: "5px 5px 0px 0px rgba(0,0,0);"
    };
  },
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#fff",
      fontSize: "0.8rem",
      lineHeight: "1.75rem"
    };
  },

  singleValue: (defaultStyles) => ({
    ...defaultStyles,
    color: "#99A0AC"
  }),
  input: (styles) => ({
    ...styles,
    color: "#99A0AC",  
    fontSize: "0.8rem",
    lineHeight: "1.75rem"
  })
};
