import { useState } from "react"


import './App.css';
import CompanyPostings from './components/CompanyPostings';
import SearchBar from './components/SearchBar';
import ExpandedSearchForm from "./components/ExpandedSearchForm";


function App() {

  // console.log(postings)


  return (
    <div className="App container">


      <SearchBar />

      {/* 
      <div class="hide">
        <ExpandedSearchForm setPostings={setPostings} />
      </div>


      {Object.entries(postings).map(([company, data]) => (<CompanyPostings company={company} data={data} />))}
 */}



    </div>
  );
}


export default App;
