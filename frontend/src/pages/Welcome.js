import { useState } from "react"


import CompanyCard from '../components/CompanyCard';
import SearchBar from '../components/SearchBar';
import DisplayOption from "../components/DisplayOption";
import { companiesSortBy, groupPostingsByCompany } from "../static/script";
import PostingCard from "../components/PostingCard";
import ResumeUpload from "../components/ResumeUpload";
import AccordionSection from "../components/AccordionSection";
import PostingsModal from "../components/PostingsModal";

const sortParams = { "Companies": ["Rating", "Name"], "Job Postings": ["Rank", "Role"] }



function Welcome() {
  const [postings, setPostings] = useState([])
  const [companiesPostings, setCompaniesPostings] = useState([])


  const [groupBy, setGroupBy] = useState("Companies")
  const [sortBy, setSortBy] = useState(sortParams.Companies[0])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);


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
      <div className="jumbotron w-100 pt-12 rounded-3">
        <h1 className="display-2 text-dark text-center py-auto pt-3 poppins-font">
          BestSuited
        </h1>
        <h3 className="display-8 text-center poppins-font">
          Jobs Tailored for You
        </h3>
      </div>


    </>
  );
}


export default Welcome;
