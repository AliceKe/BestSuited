import { useState } from "react"


import './App.css';
import CompanyCard from './components/CompanyCard';
import SearchBar from './components/SearchBar';
import SortByDropDown from "./components/SortBy";
import DisplayOption from "./components/DisplayOption";
import { groupPostingsByCompany, setNestedPropertyValue } from "./static/script";
import { Button } from "react-bootstrap";
import ExpandedSearchForm from "./components/ExpandedSearchForm";
import PostingCard from "./components/PostingCard";
import FilterAccordion from "./components/FilterAccordion";
import ResumeUpload from "./components/ResumeUpload";

const sortParams = { "Companies": ["Rating", "Name"], "Job Postings": ["Rank", "Role"] }



function App() {
  const [postings, setPostings] = useState([])

  const [groupBy, setGroupBy] = useState("Companies")
  const [sortBy, setSortBy] = useState(sortParams.Companies[0])

  const companyPostings = groupPostingsByCompany(postings)
  const [filteredPostings, setFilteredPostings] = useState([]);
  const updateFilteredPostings = (filteredPostings) => {
    setFilteredPostings(filteredPostings);
  }
  console.log(filteredPostings);

  return (
    <>

      <div className="container-fluid ">
        <div className="top-text">
          <h1 className="heading">BESTSUITED</h1>
          <h2 className="heading ">JOBS TAILORED FOR YOU</h2>

          <ResumeUpload></ResumeUpload>
          <h2>OR</h2>
          <SearchBar setPostings={setPostings} />

          <div className="d-flex mt-3 justify-content-around">
            <DisplayOption value={groupBy} setHandler={setGroupBy} variant="outline-primary" type="List" options={Object.keys(sortParams)} cls="rounded-start-pill me-3" />

            <FilterAccordion />

            {groupBy === "Companies" && <DisplayOption value={sortParams.Companies[0]} setHandler={setSortBy} variant="outline-success" type="Sort By" options={sortParams.Companies} cls="rounded-end-pill ms-3" />}
            {groupBy === "Job Postings" && <DisplayOption value={sortParams["Job Postings"][0]} setHandler={setSortBy} variant="outline-success" type="Sort By" options={sortParams["Job Postings"]} cls="rounded-end-pill ms-3" />}


          </div>


          {
            groupBy === "Job Postings" &&
            <div class="row w-100">
              {postings.map((posting) => (<PostingCard posting={posting} />))}
            </div>
          }

          {
            groupBy === "Companies" &&
            <div class="row w-100">
              {Object.entries(companyPostings).map(([company, data]) => (<CompanyCard key={company} companyName={company} data={data} />))}
            </div>
          }
          {
            groupBy === "Companies" && (
              <div className="row w-100">
                {filteredPostings.map(([company, data]) => (
                  <CompanyCard key={company} companyName={company} data={data} />
                ))}
              </div>
            )
          }

        </div >

      </div >
    </>
  );
}


export default App;
