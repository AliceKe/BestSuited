import React, { useState } from 'react';
import { Button } from 'react-bootstrap/';

import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import MultiSelect from './MultiSelect';
import { jobRoles, countries, skills } from '../static/data'

function CollapseContent({ eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => { },
  );

  return (

    <Button
      className="w-50 mt-3 mr-3 border-0 border-bottom border-danger mx-auto text-center"
      variant="outline-danger" onClick={decoratedOnClick}>Close X </Button>
  );
}

const ExpandedSearchForm = ({ setFilters, applyFilters }) => {

  const defaultSalaryRange = localStorage.getItem('salaryRange') || [0, 300000];
  const [salaryRange, setSalaryRange] = useState(defaultSalaryRange);

  const handleInputChange = ({ field, value }) => {
    setFilters((prevFilters) =>
      ({ ...prevFilters, [field]: value })
    );

  };

  return (
    <>
      <div className="form-filters block z-3 justify-content-center px-3">
        <form className='d-flex  flex-column' >
          <div className="d-flex flex-row">
            <div className="form-group">
              <MultiSelect filterKey={"role"} dropdown_items={jobRoles} dropdown_type={"Roles"} setSelectedItem={handleInputChange} />
            </div>
            <div className="form-group">
              <MultiSelect filterKey={"country"} dropdown_items={countries} dropdown_type={"Locations"} setSelectedItem={handleInputChange} />
            </div>
            {/* <div className="form-group">
              <MultiSelect filterKey={"skills"} dropdown_items={skills} dropdown_type={"Skills"} setSelectedItem={handleInputChange} />
            </div> */}
          </div>

          {/* <div className="form-group">
            <p id="salaryrange-p">Select Salary Range:</p>
            <SortSlider value={salaryRange} onChange={handleSalaryRangeChange} />
          </div> */}

          <div className="d-flex justify-content-around">
            <Button className='w-50 mt-3 mr-3 border-0 border-bottom border-success mx-auto text-center' onClick={applyFilters} variant='outline-success'>Apply Filters</Button>
            <CollapseContent eventKey="0"></CollapseContent>
          </div>
        </form>
      </div >
    </>
  )
};



export default ExpandedSearchForm;


