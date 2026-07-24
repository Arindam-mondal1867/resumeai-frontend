import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setDark(!dark)}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "10px 15px",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer",
        background: dark
          ? "linear-gradient(135deg,#3b82f6,#6366f1)"
          : "linear-gradient(135deg,#facc15,#f97316)",
        color: "white",
        zIndex: 1000,
        boxShadow: "0 0 15px rgba(0,0,0,0.4)",
      }}
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;