import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


const MultiSelect = ({ dropdown_items, dropdown_type, setSelectedItem }) => {
  const handleSelection = (e, value) => {
    console.log(value)
    setSelectedItem(value);
  };


  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        multiple
        id="formGroupSkills"
        options={dropdown_items.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={dropdown_type}
            placeholder={dropdown_type}
          />
        )}
        onChange={handleSelection}
      />
    </Stack>
    //   <select onChange={handleSelection}>
    //     <option value="">Select {dropdown_type}</option>
    //     {dropdown_items.map((item, index) => (
    //       <option key={index} value={item.title}>{item.title}</option>
    //     ))}
    //   </select>
  )
}


export default MultiSelect;
