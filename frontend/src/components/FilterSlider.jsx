import { Slider } from '@mui/material';
import { useState } from 'react';


const minDistance = 20000;


function valuetext(value) {
  return value;
}


const FilterSlider = ({ salaryRange, setHandler }) => {
  const [value, setValue] = useState(salaryRange);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }

    setHandler({ field: "salary range", value: value })
  };


  return (
    <Slider
      getAriaLabel={() => 'Minimum distance'}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={(e) => (valuetext(e))}
      disableSwap
      min={salaryRange[0]}
      max={salaryRange[1]}
      step={5000}
    />
  )
}


export default FilterSlider;
