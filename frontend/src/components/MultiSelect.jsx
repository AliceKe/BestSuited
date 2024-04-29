import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


const MultiSelect = ({ filterKey, dropdown_items, dropdown_type, setSelectedItem }) => {
  const handleSelection = (e, value) => {
    setSelectedItem(({ field: filterKey, value: value }));
  };


  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        multiple
        id="formGroupSkills"
        options={dropdown_items}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={dropdown_type}
            required={true}
          // placeholder={dropdown_type}
          />
        )}
        onChange={handleSelection}
      />
    </Stack>
  )
}


export default MultiSelect;
