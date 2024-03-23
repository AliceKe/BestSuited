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

      <div className="container-fluid">
        <div className="top-text">
          <h1 className="heading">BESTSUITED</h1>
          <h2 className="heading ">JOBS TAILORED FOR YOU</h2>

          <SearchBar setPostings={setPostings} />

          <div className="row justify-content-around">
            {Object.entries(postings).map(([company, data]) => (<CompanyCard companyName={company} data={data} />))}
          </div>




        </div>

      </div>
    </>
  );
}


export default App;
