import './App.css';
import CompanyPostings from './components/CompanyPostings';
import SearchBar from './components/SearchBar';
import SortSlider from './components/SortSlider';

function App() {
  return (
    <div className="App">

      <SearchBar />
      <SortSlider/>
      <CompanyPostings />
    </div>
  );
}

export default App;
