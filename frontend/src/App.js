import { useState } from "react"


import './App.css';
import CompanyCard from './components/CompanyCard';
import SearchBar from './components/SearchBar';
import DisplayOption from "./components/DisplayOption";
import { companiesSortBy, groupPostingsByCompany } from "./static/script";
import PostingCard from "./components/PostingCard";
import ResumeUpload from "./components/ResumeUpload";
import FilterAccordion from "./components/FilterAccordion";
import Playground from "./pages/Playground";
import Landing from "./pages/Landing";

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

  const updateFilteredPostings = (filteredData) => {
    setPostings(filteredData);
    setCompaniesPostings(groupPostingsByCompany(filteredData));
  };

  return (
    <>
      <div className="container-fluid">
        {/* <Landing /> */}
        <Playground />

        <div className="bottom-0 d-flex position-fixed justify-content-between w-100">
          <p> <a href="https://github.com/AliceKe/BestSuited">Built</a> with ❤️ by C.A.A.A.O.</p>
          {/* <p className="">© 2024</p> */}
        </div>
      </div >
    </>
  );
}


export default App;
