import React, { useState, useEffect } from 'react';
import MultiSelect from './MultiSelect';
import SortSlider from './FilterSlider';


const ExpandedSearchForm = ({ setPostings }) => {
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




  const fetchData = async (searchQuery) => {
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
      const response = await fetch(`http://127.0.0.1:5001/jobs?${queryParams}`);
      const data = await response.json();
      let filteredPostings = [];
      Object.entries(data.postings).forEach(company => {
        company[1].postings.forEach(posting => {
          const jobTitleMatch = selectedJobs.length === 0 || selectedJobs.includes(posting.role.toLowerCase());
          const locationMatch = selectedLocation.length === 0 || selectedLocation.includes(`${posting.city}, ${posting.country}`);
          const skillMatch = selectedSkill.length === 0 || selectedSkill.some(skill => posting.skills.includes(skill));


          const salaryRangeString = posting['salary range'];
          const salaryRangeArray = salaryRangeString.split('-');
          const minPostingSalary = parseFloat(salaryRangeArray[0].replace('$', '').replace('K', '000'));
          const maxPostingSalary = parseFloat(salaryRangeArray[1].replace('$', '').replace('K', '000'));
          const salaryMatch = salaryRange.length === 0 || (minSalary <= minPostingSalary && maxSalary >= maxPostingSalary);


          if (jobTitleMatch && locationMatch && skillMatch && salaryMatch) {
            filteredPostings.push(posting);
          }
        });
      });
      console.log(filteredPostings)
      setFilteredPostings(filteredPostings)
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
    console.log(selectedJobs)
    // fetchData();
  };


  const handleLocationInputChange = (e) => {
    setSelectedLocation(e.target.value);
    console.log(selectedLocation)
    // fetchData();
  };


  const handleSkillInputChange = (e) => {
    setSelectedSkill(e.target.value);
    console.log(selectedSkill)
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
      <div className="form-group">
        <input
          type="text"
          placeholder="Search for a job title, company or skills"
          id="filter-text-val"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>


      <div className="form-filters">
        <button onClick={toggleFormVisibility}>
          {isExpanded ? "Hide Form" : "Show Form"}
        </button>


        {isExpanded && (
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
            <h4>Select Salary Range:</h4>
            <div className="form-group">
              <SortSlider value={salaryRange} onChange={handleSalaryRangeChange} />
            </div>


            <button type="submit" className="btn btn-primary"
              onClick={handleSubmit}
            >Submit</button>


          </form>
        )}
      </div >
      {filteredPostings.length > 0 && (
        <div className="filtered-postings">
          <h2>Filtered Postings</h2>
        </div>
      )}
    </>
  )
};


export default ExpandedSearchForm;
