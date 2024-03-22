import { useState } from "react"

import './App.css';
import CompanyPostings from './components/CompanyPostings';
import SearchBar from './components/SearchBar';
<<<<<<< HEAD
import ExpandedSearchForm from "./components/ExpandedSearchForm";
=======
import SortByDropDown from './components/SortBy';
>>>>>>> main

function App() {
  const [postings, setPostings] = useState([])

  return (
    <div className="App container">

      <SearchBar setPostings={setPostings} />

<<<<<<< HEAD
      <div class="hide">
        <ExpandedSearchForm setPostings={setPostings} />
      </div>

      {Object.entries(postings).map(([company, data]) => (<CompanyPostings company={company} data={data} />))}

=======
      <div>
        {Object.entries(postings)
          .map(([company, data]) => (<CompanyPostings company={company} data={data} />))}
      </div>
>>>>>>> main

    </div>
  );
}

export default App;
