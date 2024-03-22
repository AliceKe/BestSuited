import { useState } from "react"

import './App.css';
import CompanyPostings from './components/CompanyPostings';
import SearchBar from './components/SearchBar';

function App() {
  const [postings, setPostings] = useState([])


  return (
    <div className="App">

      <SearchBar setPostings={setPostings} />

      {Object.entries(postings).map(([company, data]) => (<CompanyPostings company={company} data={data} />))}


    </div>
  );
}

export default App;
