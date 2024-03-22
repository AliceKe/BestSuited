import './App.css';
import CompanyPostings from './components/CompanyPostings';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">

      <SearchBar />
      <CompanyPostings />
    </div>
  );
}

export default App;
