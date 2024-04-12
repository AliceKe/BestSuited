import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const CompanyRating = ({ value }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Rating
        className="company-rating"
        value={value}
        precision={0.5}
        readOnly
      />
      <span>{value}</span>
    </Stack>
  );
};

export default CompanyRating;
