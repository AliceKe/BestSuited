import * as React from "react";
import { Slider } from "@mui/material";

const minDistance = 10000;

const SortSlider = ({ value: propValue, onChange }) => {
  const [value, setValue] = React.useState(propValue || [0, 300000]);

  const handleChange = (event, newValue) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    const [left, right] = newValue;
    const distance = right - left;

    let newValueAdjusted = [left, right];

    // Ensure minimum distance between left and right thumbs
    if (distance < minDistance) {
      if (event.target.id === "left-slider") {
        // If the left slider is changed, update the right slider
        const newRight = Math.min(300000, left + minDistance);
        newValueAdjusted = [left, newRight];
      } else if (event.target.id === "right-slider") {
        // If the right slider is changed, update the left slider
        const newLeft = Math.max(0, right - minDistance);
        newValueAdjusted = [newLeft, right];
      }
    }

    setValue(newValueAdjusted);

    if (onChange) {
      onChange(newValueAdjusted); // Pass updated [left, right] values
    }
  };

  return (
    <Slider
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      min={0}
      max={300000}
      step={10000}
    >
      {(index, value) => (
        <Slider
          key={index}
          value={value[index]}
          onChange={(event, newValue) => {
            const updatedValue = [...value];
            updatedValue[index] = newValue;
            const [left, right] = updatedValue;
            const distance = right - left;

            if (distance < minDistance) {
              if (index === 0) {
                updatedValue[1] = Math.min(300000, left + minDistance);
              } else {
                updatedValue[0] = Math.max(0, right - minDistance);
              }
            }

            handleChange(event, updatedValue);
          }}
          valueLabelDisplay="auto"
          min={0}
          max={300000}
          step={10000}
          id={index === 0 ? "left-slider" : "right-slider"}
        />
      )}
    </Slider>
  );
};

export default SortSlider;
