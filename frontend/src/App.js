import { useState } from "react"


import './App.css';
import CompanyCard from './components/CompanyCard';
import SearchBar from './components/SearchBar';
import DisplayOption from "./components/DisplayOption";
import { companiesSortBy, groupPostingsByCompany } from "./static/script";
import PostingCard from "./components/PostingCard";
import ResumeUpload from "./components/ResumeUpload";

const sortParams = { "Companies": ["Rating", "Name"], "Job Postings": ["Rank", "Role"] }



function App() {
  const [postings, setPostings] = useState([])
  const [companiesPostings, setCompaniesPostings] = useState([])


  const [groupBy, setGroupBy] = useState("Companies")
  const [sortBy, setSortBy] = useState(sortParams.Companies[0])

  const handlePostingsUpdate = (data) => {
    setPostings(data);
    setCompaniesPostings(groupPostingsByCompany(data));
  }

  const handleSorting = (val) => {
    if (["Rating", "Name"].indexOf(val) !== -1) {
      let tmp = companiesSortBy(companiesPostings, val);
      setCompaniesPostings(tmp)
    }
    setSortBy(val);
  }


  return (
    <>
      <div className="container-fluid">
        <div className="top-text">
          <h1 className="heading">BESTSUITED</h1>
          <h2 className="heading ">Jobs Tailored Just For You!</h2>


          <SearchBar setPostings={handlePostingsUpdate} />

          <div className="row mt-3 justify-content-around">
            <DisplayOption value={groupBy} setHandler={setGroupBy} variant="outline-primary" type="List" options={Object.keys(sortParams)} cls="rounded-start-pill me-3" />

            {/* <FilterAccordion /> */}
            <ResumeUpload setPostings={handlePostingsUpdate}></ResumeUpload>
            {groupBy === "Companies" && <DisplayOption value={sortBy} setHandler={handleSorting} variant="outline-success" type="Sort By" options={sortParams.Companies} cls="rounded-end-pill ms-3 " />}
            {groupBy === "Job Postings" && <DisplayOption value={sortBy} setHandler={handleSorting} variant="outline-success" type="Sort By" options={sortParams["Job Postings"]} cls="rounded-end-pill ms-3 " />}
          </div>


          {
            groupBy === "Job Postings" &&
            <div class="row mt-1 w-100">
              {postings.map((posting) => (<PostingCard posting={posting} />))}
            </div>
          }

          {
            groupBy === "Companies" &&
            <div class="row mt-1 w-100">
              {companiesPostings.map((companyData, key) => (<CompanyCard key={key} companyName={companyData.name} data={companyData} />))}
            </div>
          }


        </div >

      </div >
    </>
  );
}


export default App;
