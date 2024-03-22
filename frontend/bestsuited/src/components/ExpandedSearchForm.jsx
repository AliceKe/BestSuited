import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

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

  // const fetchData = async (e) => {
  //   try {
  //     const response = await fetch(`http://127.0.0.1:5001/jobs?q=${e.target.value}`);
  //     const data = await response.json();
  //     setPostings(data.postings)
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // jobs
  // const handleJobChange = (e) => {
  //   setSelectedJobs(e.target.value);
  //   const input = e.target.value.toLowerCase();
  //   const suggestedJobs = ["software engineer", "data scientist", "network security engineer", "usability analyst"]; // Replace with your actual list of job titles

  //   const filteredJobs = input
  //     ? suggestedJobs.filter((job) =>
  //       job.toLowerCase().includes(input) // Use includes() to match substrings
  //     )
  //     : suggestedJobs;

  //   setJobs(filteredJobs);
  // };
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

    const filteredJobs = suggestedJobs.filter((job) =>
      job.toLowerCase().includes(input)
    );
    setJobs(filteredJobs);
  };

  const handleJobSelect = (e) => {
    setSelectedJobs(e.target.value);
  };

  // location
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    // const suggestedSkills = skillsList;
    const suggestedLocation = ["Nicosia, Cyprus", "Mexico City, Mexico", "Nuuk, Greenland"]; // Replace with actual logic to fetch suggestions
    const filteredLocation = suggestedLocation.filter((job) =>
      job.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setLocation(filteredLocation);
  };

  const handleLocationSelect = (e) => {
    setSelectedLocation(e.target.value);
  };

  // skills
  const handleSkillChange = (e) => {
    setSelectedSkill(e.target.value);
    // const suggestedSkills = skillsList;
    const suggestedSkills = ["JavaScript", "Python", "Java", "React", "Node.js"]; // Replace with actual logic to fetch suggestions
    const filteredSkills = suggestedSkills.filter((skill) =>
      skill.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setSkills(filteredSkills);
  };

  const handleSkillSelect = (e) => {
    setSelectedSkill(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submitting the form or applying the filter
  };

  // right now, it automatically searches without needing to click the "Apply Filters" button.  Implement functionality for it.
  return (
    <>
      <div class="form-filters">
        <button onClick={toggleFormVisibility}>
          {isExpanded ? "Hide Form" : "Show Form"}
        </button>

        {isExpanded && (
          <form onSubmit={handleSubmit}>
            {/* <div className="form-group">
              <label for="formGroupJobTitle">Job title</label>
              <input type="text" className="form-control" id="formGroupJobTitle" placeholder="e.g. software engineer"
                onKeyUp={fetchData} />
            </div> */}
            <div className="form-group">
              {/* <label for="formGroupJobs">Enter Job Title</label>
              <input
                type="text"
                className="form-control"
                id="formGroupJobs"
                placeholder="e.g. software engineer"
                value={selectedJobs}
                onChange={handleJobChange}
                onFocus={handleInputFocus}
              />
              <select className="form-control" value={selectedJobs} onChange={handleJobSelect}>
                {jobs.map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </select> */}
              <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                  id="formGroupJobs"
                  options={suggestedJobs.map((option) => option.title)}
                  renderInput={(params) => <TextField {...params} label="Job title" />}
                />
              </Stack>
            </div>


            {/* <div className="form-group">
              <label for="formGroupLocation">Enter Location</label>
              <input type="text" className="form-control" id="formGroupLocation" placeholder="city, country"
                onKeyUp={fetchData} />
            </div> */}
            <div className="form-group">
              <label for="formGroupLocation">Enter Location</label>
              <input
                type="text"
                className="form-control"
                id="formGroupLocation"
                placeholder="city, country"
                value={selectedLocation}
                onChange={handleLocationChange}
              />
              {location.length > 0 && (
                <select className="form-control" value={selectedLocation} onChange={handleLocationSelect}>
                  {location.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              )}
            </div>


            <div className="form-group">
              <label for="formGroupSkills">Skills</label>
              <input
                type="text"
                className="form-control"
                id="formGroupSkills"
                placeholder="Enter skill"
                value={selectedSkill}
                onChange={handleSkillChange}
              />
              {skills.length > 0 && (
                <select className="form-control" value={selectedSkill} onChange={handleSkillSelect}>
                  {skills.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <button type="submit" className="btn btn-primary">Apply Filter</button>
          </form>
        )}
      </div>

    </>
  )
}

export default ExpandedSearchForm;