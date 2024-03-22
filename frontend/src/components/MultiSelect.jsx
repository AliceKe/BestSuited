import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const MultiSelect = ({ dropdown_items, dropdown_type }) => {
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
      />
    </Stack>
  )
}

export default MultiSelect;