import React, { useState } from 'react';
import { Button } from 'react-bootstrap/';

import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import MultiSelect from './MultiSelect';
import { jobRoles, countries, skills } from '../static/data'
import SalaryRangeSlider from './SalaryRangeSlider';

function CollapseContent({ eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => { },
  );

  return (

    <Button
      className="col-2 rounded-end-pill my-auto mb-3 pt-1 ms-3 mb-1  h-50"
      variant="outline-danger" onClick={decoratedOnClick}>Cancel </Button>
  );
}

const ExpandedSearchForm = ({ salaryRange, setFilters, applyFilters }) => {


  const handleInputChange = ({ field, value }) => {
    setFilters((prevFilters) =>
      ({ ...prevFilters, [field]: value })
    );

  };

  return (
    <>
      <div className="form-filters block z-3 justify-content-center px-3">
        <form className='d-flex flex-column' >
          <div className="d-flex justify-content-between flex-row">
            <div className="form-group">
              <MultiSelect filterKey={"role"} dropdown_items={jobRoles} dropdown_type={"Roles"} setSelectedItem={handleInputChange} />
            </div>
            <div className="form-group">
              <MultiSelect filterKey={"country"} dropdown_items={countries} dropdown_type={"Locations"} setSelectedItem={handleInputChange} />
            </div>
          </div>

          <div className="row justify-content-between mt-1">
            <Button className='col-2 rounded-start-pill my-auto mb-3 pt-1 ms-3 mb-1  h-50' onClick={applyFilters} variant='outline-success'>Apply</Button>
            <div className="col-6">
              <p id="salaryrange-p">Salary Range:</p>
              <SalaryRangeSlider salaryRange={salaryRange} setHandler={handleInputChange} />
            </div>
            <CollapseContent eventKey="0"></CollapseContent>
          </div>


        </form>
      </div >
    </>
  )
};



export default ExpandedSearchForm;


