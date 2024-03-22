

const SearchBar = ({ setPostings }) => {


    const fetchData = async (e) => {
        try {
            const response = await fetch(`http://127.0.0.1:5001/jobs?q=${e.target.value}`);
            const data = await response.json();
            setPostings(data.postings)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return (

        <input placeholder="Search for a job title, company or skills" id="filter-text-val"
            onKeyUp={fetchData}>

        </input>
    )

}

export default SearchBar;