import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import MultiSelect from './MultiSelect';

const ExpandedSearchForm = ({ setPostings }) => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");

  const [jobs, setJobs] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState("");

  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFormVisibility = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    fetchData("");
  }, []);


  const fetchData = async (e) => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/jobs?q=${e.target.value}`);
      const data = await response.json();
      setPostings(data.postings)
      console.log(data)
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

  const handleInputFocus = () => {
    setIsExpanded(true);
  };

  const handleJobChange = (e) => {
    setSelectedJobs(e.target.value);
    handleInputFocus();

    const input = e.target.value.toLowerCase();

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

    const filteredJobs = suggestedJobs.filter((job) =>
      job.toLowerCase().includes(input)
    );
    setJobs(filteredJobs);
  };

  // const handleJobSelect = (e) => {
  //   setSelectedJobs(e.target.value);
  // };

  // location
  // const handleLocationChange = (e) => {
  //   setSelectedLocation(e.target.value);
  //   // const suggestedSkills = skillsList;
  //   const suggestedLocation = ["Nicosia, Cyprus", "Mexico City, Mexico", "Nuuk, Greenland"]; // Replace with actual logic to fetch suggestions
  //   const filteredLocation = suggestedLocation.filter((job) =>
  //     job.toLowerCase().startsWith(e.target.value.toLowerCase())
  //   );
  //   setLocation(filteredLocation);
  // };

  // const handleLocationSelect = (e) => {
  //   setSelectedLocation(e.target.value);
  // };

  // skills
  // const handleSkillChange = (e) => {
  //   setSelectedSkill(e.target.value);
  //   // const suggestedSkills = skillsList;
  //   const suggestedSkills = ["JavaScript", "Python", "Java", "React", "Node.js"]; // Replace with actual logic to fetch suggestions
  //   const filteredSkills = suggestedSkills.filter((skill) =>
  //     skill.toLowerCase().startsWith(e.target.value.toLowerCase())
  //   );
  //   setSkills(filteredSkills);
  // };

  // const handleSkillSelect = (e) => {
  //   setSelectedSkill(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submitting the form or applying the filter

  };

  // right now, it automatically searches without needing to click the "Apply Filters" button.  Implement functionality for it.
  return (
    <>
      <div className="form-filters">
        <button onClick={toggleFormVisibility}>
          {isExpanded ? "Hide Form" : "Show Form"}
        </button>

        {isExpanded && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <MultiSelect dropdown_items={suggestedJobs} dropdown_type={"Job Titles"}>
              </MultiSelect>
            </div>
            <div className="form-group">
              <MultiSelect dropdown_items={suggestedLocation} dropdown_type={"Locations"}>
              </MultiSelect>
            </div>
            <div className="form-group">
              <MultiSelect dropdown_items={suggestedSkills} dropdown_type={"Skills"}>
              </MultiSelect>

            </div>
            <button type="submit" className="btn btn-primary"
              onClick={handleSubmit}
            >Submit</button>
          </form>
        )}
      </div>

    </>
  )
}

export default ExpandedSearchForm;