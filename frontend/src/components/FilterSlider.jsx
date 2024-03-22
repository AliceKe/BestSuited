import * as React from 'react';
import { Slider } from '@mui/material';


const minDistance = 20000;


function valuetext(value) {
  return value;
}


const SortSlider = ({ value: propValue, onChange }) => {
  const [value, setValue] = React.useState(propValue || [0, 300000]);


  const handleChange = (event, newValue, activeThumb) => {
    console.log(newValue)
    if (!Array.isArray(newValue)) {
      return;
    }


    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
    if (onChange) {
      onChange(value);
    }
  };


  return (
    <Slider
      getAriaLabel={() => 'Minimum distance'}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={(e) => (valuetext(e))}
      disableSwap
      min={0}
      max={300000}
      step={10000}
    />
  )
}


export default SortSlider;
