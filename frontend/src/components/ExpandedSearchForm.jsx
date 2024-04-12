import React, { useState, useEffect } from 'react';
import { Dropdown, Button } from 'react-bootstrap/';
import { backendUrl } from "../static/script";


import MultiSelect from './MultiSelect';
import SortSlider from './FilterSlider';




const ExpandedSearchForm = ({ updateFilteredPostings }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState([]);




  const [selectedJobs, setSelectedJobs] = useState([]);




  const [selectedLocation, setSelectedLocation] = useState([]);




  const [filteredPostings, setFilteredPostings] = useState([]);




  const [isExpanded, setIsExpanded] = useState(false);




  const defaultSalaryRange = localStorage.getItem('salaryRange') || [0, 300000];
  const [salaryRange, setSalaryRange] = useState(defaultSalaryRange);




  const toggleFormVisibility = () => {
    setIsExpanded(!isExpanded);
  };


  const fetchData = async () => {
    try {
      const minSalary = salaryRange[0];
      const maxSalary = salaryRange[1];
      // const queryParams = new URLSearchParams({
      //   jobTitle: selectedJobs.join(','),
      //   location: selectedLocation.join(','),
      //   skill: selectedSkill.join(',')
      // });
      // console.log(Object.fromEntries(queryParams));
      // const response = await fetch(`${backendUrl.remote}/regular?q=${queryParams}`);

      // const queryParams = new URLSearchParams();
      // queryParams.append("q", `jobTitle=${selectedJobs.join(',')}&location=${selectedLocation.join(',')}&skill=${selectedSkill.join(',')}`);
      // queryParams.append("jobTitle", selectedJobs.join(','));
      // queryParams.append("location", selectedLocation.join(','));
      // queryParams.append("skill", selectedSkill.join(','));


      let queryParams = '';
      if (selectedJobs.length > 0) {
        queryParams += `${selectedJobs.join(',')}&`;
      }
      if (selectedLocation.length > 0) {
        queryParams += `${selectedLocation.join(',')}&`;
      }
      if (selectedSkill.length > 0) {
        console.log(selectedSkill)
        selectedSkill.forEach(skill => {
          queryParams += `${skill}&`;
        });
      }
      queryParams = queryParams.replace(/&$/, '');

      console.log(`${backendUrl.remote}/regular?q=${queryParams}`);
      const response = await fetch(`${backendUrl.remote}/regular?q=${queryParams}`);

      const data = await response.json();
      console.log(data);

      let filteredPostings = [];
      Object.entries(data.postings).forEach(company => {
        // console.log(company);
        const jobTitleMatch = selectedJobs.length === 0 || company[1].role.toLowerCase().includes(selectedJobs);
        const locationMatch = selectedLocation.length === 0 || selectedLocation.includes(`${company[1].city}, ${company[1].country}`);
        const skillMatch = selectedSkill.length === 0 || selectedSkill.some(skill => (company[1].skills).toLowerCase().includes(skill.toLowerCase()));
        const salaryRangeString = company[1]['salary range'];
        const salaryRangeArray = salaryRangeString.split('-');
        const minPostingSalary = parseFloat(salaryRangeArray[0].replace('$', '').replace('K', '000'));
        const maxPostingSalary = parseFloat(salaryRangeArray[1].replace('$', '').replace('K', '000'));
        const salaryMatch = salaryRange.length === 0 || (minSalary <= minPostingSalary && maxSalary >= maxPostingSalary);

        if (jobTitleMatch && locationMatch && skillMatch && salaryMatch) {
          filteredPostings.push(company[1]); // pushing the company object, not the 'posting' variable
        }
      });

      setFilteredPostings(filteredPostings); // setting the state with filteredPostings
      updateFilteredPostings(filteredPostings); // updating any other function or state with filteredPostings
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };





  const suggestedJobs = [
    { title: "software engineer" },
    { title: "data scientist" },
    { title: "network security engineer" },
    { title: "usability analyst" }
  ];




  const suggestedLocation = [
    { title: "Nicosia, Cyprus" },
    { title: "Mexico City, Mexico" },
    { title: "Nuuk, Greenland" },
    { title: "Kuala Lumpur, Malaysia" }
  ];




  const suggestedSkills = [
    { title: "Python" },
    { title: "JavaScript" },
    { title: "React" },
    { title: "Node.js" }
  ];




  // const handleInputChange = (e) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);
  //   fetchData(query);
  // };




  const handleJobInputChange = (e) => {
    console.log(e);
    setSelectedJobs(e.target.value)
    // fetchData();
  };




  const handleLocationInputChange = (e) => {
    console.log(e);

    setSelectedLocation(e.target.value);

    // fetchData();
  };




  const handleSkillInputChange = (selectedSkills) => {
    setSelectedSkill(selectedSkills);
    // fetchData();
  };




  const handleSalaryRangeChange = (newValue) => {
    console.log("filter by salary range")

    setSalaryRange(newValue);
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchData();
    // toggleFormVisibility();
    // setIsExpanded(false);
  };




  return (
    <>
      {/* <div className="form-group">
       <input
         type="text"
         placeholder="Search for a job title, company or skills"
         id="filter-text-val"
         value={searchQuery}
         onChange={handleInputChange}
       />
     </div> */}




      <div className="form-filters justify-content-center px-3">
        {/* <button class="btn dropdown-toggle" onClick={toggleFormVisibility}>
         {isExpanded ? "Filter By" : "Filter By"}
       </button> */}
        {/* {isExpanded && */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <MultiSelect dropdown_items={suggestedJobs} dropdown_type={"Job Titles"} setSelectedItem={setSelectedJobs} onChange={handleJobInputChange} />
          </div>
          <div className="form-group">
            <MultiSelect dropdown_items={suggestedLocation} dropdown_type={"Locations"} setSelectedItem={setSelectedLocation} onChange={handleLocationInputChange} />
          </div>
          <div className="form-group">
            <MultiSelect dropdown_items={suggestedSkills} dropdown_type={"Skills"} setSelectedItem={setSelectedSkill} onChange={handleSkillInputChange} />
          </div>
          <div className="form-group">
            <p id="salaryrange-p">Select Salary Range:</p>
            <SortSlider value={salaryRange} onChange={handleSalaryRangeChange} />
          </div>




          <Button className='mx-auto' onClick={handleSubmit} variant='outline-info'>Apply Filters</Button>






        </form>
      </div >
    </>
  )
};




export default ExpandedSearchForm;


