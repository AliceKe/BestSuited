import React, { useState, useEffect } from 'react';
import { Dropdown, Button } from 'react-bootstrap/';

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


  // useEffect(() => {
  //   console.log(salaryRange)
  //   fetchData();
  //   //
  // }, [searchQuery, selectedJobs, selectedLocation, selectedSkill, salaryRange]);




  const fetchData = async () => {
    try {
      const minSalary = salaryRange[0];
      const maxSalary = salaryRange[1]
      const queryParams = new URLSearchParams({
        // searchQuery: searchQuery,
        jobTitle: selectedJobs.join(','),
        location: selectedLocation.join(','),
        skill: selectedSkill.join(',')
      });
      // console.log(searchQuery)
      const response = await fetch(`http://4300showcase.infosci.cornell.edu:5184/regular?q=${queryParams}`);
      const data = await response.json();
      let filteredPostings = [];
      Object.entries(data.postings).forEach(company => {
        company[1].postings.forEach(posting => {
          const jobTitleMatch = selectedJobs.length === 0 || posting.role.toLowerCase().includes(selectedJobs);
          const locationMatch = selectedLocation.length === 0 || `${posting.city}, ${posting.country}`.includes(selectedLocation);
          const skillMatch = selectedSkill.length === 0 || selectedSkill.some(skill => posting.skills.includes(skill));

          const salaryRangeString = posting['salary range'];
          const salaryRangeArray = salaryRangeString.split('-');
          const minPostingSalary = parseFloat(salaryRangeArray[0].replace('$', '').replace('K', '000'));
          const maxPostingSalary = parseFloat(salaryRangeArray[1].replace('$', '').replace('K', '000'));
          const salaryMatch = salaryRange.length === 0 || (minSalary <= minPostingSalary && maxSalary >= maxPostingSalary);

          if (jobTitleMatch && locationMatch && skillMatch && salaryMatch) {
            const postingDict = company;
            postingDict[1].postings = [posting];
            filteredPostings.push(postingDict);
          }
        });
      });
      setFilteredPostings(filteredPostings)
      updateFilteredPostings(filteredPostings);
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
    { title: "Nuuk, Greenland" }
  ];


  const suggestedSkills = [
    { title: "Python" },
    { title: "JavaScript" },
    { title: "React" },
    { title: "Node.js" }
  ];


  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchData(query);
  };


  const handleJobInputChange = (e) => {
    setSelectedJobs = e.target.value
    // fetchData();
  };


  const handleLocationInputChange = (e) => {
    setSelectedLocation(e.target.value);
    // fetchData();
  };


  const handleSkillInputChange = (e) => {
    setSelectedSkill(e.target.value);
    // fetchData();
  };


  const handleSalaryRangeChange = (newValue) => {
    setSalaryRange(newValue);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchData();
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


          {/* <Button className='mx-auto' onClick={handleSubmit} variant='outline-info'>Apply Filters</Button> */}



        </form>
      </div >
    </>
  )
};


export default ExpandedSearchForm;
