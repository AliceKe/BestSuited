import { useEffect, useState } from "react";

import "./App.css";
import CompanyCard from "./components/CompanyCard";
import SearchBar from "./components/SearchBar";
import SortByDropDown from "./components/SortBy";
import DisplayOption from "./components/DisplayOption";
import {
  companiesSortBy,
  groupPostingsByCompany,
  jobsSortBy,
  setNestedPropertyValue,
  sortByField,
} from "./static/script";
import { Button } from "react-bootstrap";
import ExpandedSearchForm from "./components/ExpandedSearchForm";
import PostingCard from "./components/PostingCard";
import FilterAccordion from "./components/FilterAccordion";
import ResumeUpload from "./components/ResumeUpload";

const sortParams = {
  Companies: ["Rating", "Name"],
  "Job Postings": ["Rank", "Role"],
};

function App() {
  const [postings, setPostings] = useState([]);
  const [companyPostings, setCompanyPostings] = useState([]);

  const [groupBy, setGroupBy] = useState("Companies");
  const [sortBy, setSortBy] = useState(sortParams.Companies[0]);

  const [filteredPostings, setFilteredPostings] = useState([]);
  const updateFilteredPostings = (filteredPostings) => {
    setFilteredPostings(filteredPostings);
  };

  const handleSorting = (sortingOrder) => {
    if (sortingOrder in sortParams["Companies"]) {
      const groupedPostings = groupPostingsByCompany(postings);
      const sortedPostings = sortByField(groupedPostings, sortingOrder, "desc");
      setCompanyPostings(sortedPostings);
    } else if (sortingOrder in sortParams["Job Postings"]) {
      const sortedPostings = sortByField(postings, sortingOrder, "desc");
      setPostings(sortedPostings);
    }
    // const selectedSortBy = sortingOrder || "Name";
    // setSortBy(selectedSortBy);
    // const groupedPostings = groupPostingsByCompany(postings);
    // const sortedPostings = companiesSortBy(groupedPostings, selectedSortBy);
    // setCompanyPostings(sortedPostings);
  };

  const handleApplicationsSortBy = (sortBy) => {
    let sorted_applications = [];
    const groupedPostings = groupPostingsByCompany(postings);
    switch (sortBy) {
      case "Rating":
        sorted_applications = sortByField(groupedPostings, "company.rating");
        setCompanyPostings(sorted_applications);
        break;
      case "Name":
        sorted_applications = sortByField(groupedPostings, "company.name");
        setCompanyPostings(sorted_applications);
        break;
      case "Rank":
        sorted_applications = sortByField(postings, "posting.rating");
        setPostings(postings);
        break;
      case "Role":
        sorted_applications = sortByField(postings, "posting.role");
        setPostings(postings);
      default:
        break;
    }
  };

  const handleJobGrouping = (sortingOrder) => {
    const selectedSortBy = sortingOrder || "Role";
    setSortBy(selectedSortBy);
    setPostings(jobsSortBy(postings, selectedSortBy));
  };

  return (
    <>
      <div className="container-fluid">
        <div className="top-text">
          <h1 className="heading">BESTSUITED</h1>
          {/* <h2 className="heading ">JOBS TAILORED FOR YOU</h2> */}

          <SearchBar setPostings={setPostings} />

          <div className="row mt-3 justify-content-around">
            <DisplayOption
              value={groupBy}
              setHandler={handleSorting}
              variant="outline-primary"
              type="List"
              options={Object.keys(sortParams)}
              cls="rounded-start-pill me-3"
            />

            {/* <FilterAccordion /> */}
            <ResumeUpload setPostings={setPostings}></ResumeUpload>
            {groupBy === "Companies" && (
              <DisplayOption
                value={sortParams.Companies[0]}
                setHandler={handleSorting}
                variant="outline-success"
                type="Sort By"
                options={sortParams.Companies}
                cls="rounded-end-pill ms-3 "
              />
            )}
            {groupBy === "Job Postings" && (
              <DisplayOption
                value={sortParams["Job Postings"][0]}
                setHandler={handleSorting}
                variant="outline-success"
                type="Sort By"
                options={sortParams["Job Postings"]}
                cls="rounded-end-pill ms-3 "
              />
            )}
          </div>

          {groupBy === "Job Postings" && (
            <div className="row mt-1 w-100">
              {postings.map((posting) => (
                <PostingCard posting={posting} />
              ))}
            </div>
          )}

          {groupBy === "Companies" && (
            <div className="row mt-1 w-100">
              {companyPostings.map((companyData, index) => (
                <CompanyCard
                  key={index}
                  companyName={companyData.name}
                  data={companyData}
                />
              ))}
            </div>
          )}
          {groupBy === "Companies" && (
            <div className="row w-100">
              {filteredPostings.map(([company, data]) => (
                <CompanyCard key={company} companyName={company} data={data} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
