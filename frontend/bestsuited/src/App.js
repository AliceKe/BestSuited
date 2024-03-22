import { useState } from "react"

import './App.css';
import CompanyPostings from './components/CompanyPostings';
import SearchBar from './components/SearchBar';
import ExpandedSearchForm from "./components/ExpandedSearchForm";
import SortByDropDown from './components/SortBy';
import AdvancedFormExpand from "./components/AdvancedFormExpand";
import CompanyCard from "./components/CompanyCard";

function App() {
  const [postings, setPostings] = useState([])

  return (
    <div className="App container">

      <SearchBar setPostings={setPostings} />
    </div>
  );
}

export default App;
