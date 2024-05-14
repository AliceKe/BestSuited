import * as React from 'react';
import { Slider } from '@mui/material';


const minDistance = 20000;


function valuetext(value) {
  return value;
}


const SalaryRangeSlider = ({ salaryRange, setHandler }) => {
  const [value, setValue] = React.useState(salaryRange[0] < salaryRange[1] ? salaryRange : [1000, 200000]);

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
      className='mb-2'
      getAriaLabel={() => 'Minimum distance'}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={(e) => (valuetext(e))}
      disableSwap
      min={salaryRange[0] < salaryRange[1] ? salaryRange[0] : 1000}
      max={salaryRange[0] < salaryRange[1] ? salaryRange[1] : 200000}
      step={1000}
    />
  )
}


export default SalaryRangeSlider;
