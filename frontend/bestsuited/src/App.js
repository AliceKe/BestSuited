import { useState } from "react"

import './App.css';
import CompanyPostings from './components/CompanyPostings';
import SearchBar from './components/SearchBar';
import SortByDropDown from './components/SortBy';
import AdvancedFormExpand from "./components/AdvancedFormExpand";
import CompanyCard from "./components/CompanyCard";

function App() {
  const [postings, setPostings] = useState([])


  return (
    <div className="App container">

      <SearchBar setPostings={setPostings} />
      <AdvancedFormExpand/>
      <CompanyCard/>
      <div>
        {Object.entries(postings)
          .map(([company, data]) => (<CompanyPostings company={company} data={data} />))}
      </div>

    </div>
  );
}

export default App;
