import { useState } from "react"


import './App.css';
import CompanyCard from './components/CompanyCard';
import SearchBar from './components/SearchBar';
import SortByDropDown from "./components/SortBy";
import DisplayOption from "./components/DisplayOption";
import { setNestedPropertyValue } from "./static/script";
import { Button } from "react-bootstrap";
import ExpandedSearchForm from "./components/ExpandedSearchForm";

const sortParams = { "Companies": ["Rating", "Name"], "Job Postings": ["Rank", "Role"] }



function App() {
  const [postings, setPostings] = useState([])

  const [groupBy, setGroupBy] = useState("Companies")
  const [sortBy, setSortBy] = useState("")
  const [filteredPostings, setFilteredPostings] = useState([]);
  const updateFilteredPostings = (filteredPostings) => {
    setFilteredPostings(filteredPostings);
  }
  console.log(filteredPostings);

  return (
    <>

      <div className="container-fluid">
        <div className="top-text">
          <h1 className="heading">BESTSUITED</h1>
          <h2 className="heading ">JOBS TAILORED FOR YOU</h2>

          <SearchBar setPostings={setPostings} />
          <div className="sort-filter">
            <ExpandedSearchForm updateFilteredPostings={updateFilteredPostings} />
          </div>



          <div className="d-flex mt-3 justify-content-around">
            <DisplayOption setHandler={setGroupBy} variant="outline-primary" type="List" options={Object.keys(sortParams)} cls="rounded-start-pill me-3" />

            <Button className="bg-light">Filter</Button>

            {groupBy === "Companies" && <DisplayOption setHandler={setSortBy} variant="outline-success" type="Sort By" options={sortParams.Companies} cls="rounded-end-pill ms-3" />}
            {groupBy === "Job Postings" && <DisplayOption setHandler={setSortBy} variant="outline-success" type="Sort By" options={sortParams["Job Postings"]} cls="rounded-end-pill ms-3" />}


          </div>


          {
            groupBy === "Job Postings" &&
            <div class="row w-100">
              {Object.entries(postings).map(([company, data]) => (<CompanyCard key={company} companyName={company} data={data} />))}
            </div>
          }

          {
            groupBy === "Companies" &&
            <div class="row w-100">
              {Object.entries(postings).map(([company, data]) => (<CompanyCard key={company} companyName={company} data={data} />))}
            </div>
          }
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
