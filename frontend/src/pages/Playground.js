import { useState } from "react"


import CompanyCard from '../components/CompanyCard';
import SearchBar from '../components/SearchBar';
import DisplayOption from "../components/DisplayOption";
import { companiesSortBy, groupPostingsByCompany } from "../static/script";
import PostingCard from "../components/PostingCard";
import ResumeUpload from "../components/ResumeUpload";
import FilterAccordion from "../components/FilterAccordion";
import PostingsModal from "../components/PostingsModal";

const sortParams = { "Companies": ["Rating", "Name"], "Job Postings": ["Rank", "Role"] }



function Playground() {
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
      <div className="container-fluid">
        <div className="top-text">


          <SearchBar setPostings={handlePostingsUpdate} />

          <div className="row mt-3 justify-content-around">
            <DisplayOption value={groupBy} setHandler={setGroupBy} variant="outline-primary" type="List" options={Object.keys(sortParams)} cls="rounded-start-pill me-3" />

            <ResumeUpload setPostings={handlePostingsUpdate}></ResumeUpload>
            {groupBy === "Companies" && <DisplayOption value={sortBy} setHandler={handleSorting} variant="outline-success" type="Sort By" options={sortParams.Companies} cls="rounded-end-pill ms-3 " />}
            {groupBy === "Job Postings" && <DisplayOption value={sortBy} setHandler={handleSorting} variant="outline-success" type="Sort By" options={sortParams["Job Postings"]} cls="rounded-end-pill ms-3 " />}

            <FilterAccordion updateFilteredPostings={updateFilteredPostings} />

          </div>


          {
            groupBy === "Job Postings" &&
            <div class="row mt-1 w-100">
              {postings.map((posting) => (<PostingCard posting={posting} />))}
            </div>
          }

          {
            groupBy === "Companies" &&
            <>

              <table class=" table mt-3 w-50">
                <tbody>
                  {companiesPostings.map((companyData, key) => (<CompanyCard key={key} companyName={companyData.name} data={companyData} setShow={setShow} />))}
                </tbody>
              </table>

              {show && <PostingsModal
                show={show}
                handleClose={handleClose}
                company={"companyName"}
                postings={[]}
              />}



            </>
          }


        </div >

      </div >
    </>
  );
}


export default Playground;
