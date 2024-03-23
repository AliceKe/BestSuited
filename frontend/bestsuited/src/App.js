import { useState } from "react"


import './App.css';
import CompanyPostings from './components/CompanyPostings';
import SearchBar from './components/SearchBar';
import ExpandedSearchForm from "./components/ExpandedSearchForm";


function App() {
  const [postings, setPostings] = useState([])
  // console.log(postings)


  return (
    <>
      <div class="container">
        <div class="top-text">
          <h1 class="heading">BESTSUITED</h1>
          <h2 class="heading ">JOBS TAILORED FOR YOU</h2>

          <div className="center-content">
            <SearchBar setPostings={setPostings} />
          </div>

          {/* <div class="hide">
              <ExpandedSearchForm setPostings={setPostings} />
            </div> */}

          <div class="row">
            {Object.entries(postings).map(([company, data]) => (<CompanyPostings company={company} data={data} />))}
          </div>




        </div>

      </div>
    </>
  );
}


export default App;
