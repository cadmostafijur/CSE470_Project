import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const ColorPicker = () => {
  const { updateColor } = useTheme();
  const [color, setColor] = useState("#008080");

  const handleChange = (e) => {
    const selectedColor = e.target.value;
    setColor(selectedColor);
    updateColor({ primaryColor: selectedColor });
    document.documentElement.style.setProperty("--primary-color", selectedColor);
  };

  return (
    <div>
      <input type="color" value={color} onChange={handleChange} />
    </div>
  );
};

export default ColorPicker;