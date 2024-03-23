import { useState } from "react"


import './App.css';
import CompanyCard from './components/CompanyCard';
import SearchBar from './components/SearchBar';
import ExpandedSearchForm from "./components/ExpandedSearchForm";

function App() {
  const [postings, setPostings] = useState([])
  const [companies, setCompanies] = useState([])

  // console.log(postings)


  return (
    <>

      <div class="container-fluid">
        <div class="top-text">
          <h1 class="heading">BESTSUITED</h1>
          <h2 class="heading ">JOBS TAILORED FOR YOU</h2>

          <SearchBar setPostings={setPostings} />

          <div className="row">
          {Object.entries(postings).map(([company, data]) => (<CompanyCard companyName={company} data={data} />))}
          </div>

          <div class="row justify-content-around">
            {Object.entries(postings).map(([company, data]) => (<CompanyCard companyName={company} data={data} />))}
          </div>




        </div>

      </div>
    </>
  );
}


export default App;
