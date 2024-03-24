import { useState } from "react"


import './App.css';
import CompanyCard from './components/CompanyCard';
import SearchBar from './components/SearchBar';
import SortByDropDown from "./components/SortBy";

const sortParams = { "companyListing": ["Company Name"] }
const mergePostings = (companyPostings) => {
  let res = []

}


function App() {
  const [postings, setPostings] = useState([])
  const [listingType, setListingType] = useState("companyListing")

  // console.log(postings)



  return (
    <>

      <div className="container-fluid">
        <div className="top-text">
          <h1 className="heading">BESTSUITED</h1>
          <h2 className="heading ">JOBS TAILORED FOR YOU</h2>

          <SearchBar setPostings={setPostings} />
          <SortByDropDown params={sortParams[listingType]} />


          <div class="row w-100">
            {Object.entries(postings).map(([company, data]) => (<CompanyCard key={company} companyName={company} data={data} />))}
          </div>

          <div class="row w-100">
            {Object.entries(postings).map(([company, data]) => (<CompanyCard key={company} companyName={company} data={data} />))}
          </div>

        </div>

      </div>
    </>
  );
}


export default App;
