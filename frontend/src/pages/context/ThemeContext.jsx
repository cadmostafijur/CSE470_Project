import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primaryColor: "#008080", // Default teal
    backgroundColor: "#ffffff", // Default white
  });

  const updateColor = (newColors) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      ...newColors,
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);