import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === null) {
    return true; 
  }

  return savedTheme === "dark";
});

 useEffect(()=>{

localStorage.setItem(
"theme",
dark?"dark":"light"
);

document.body.className=
dark
?"dark"
:"light";

},[dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};