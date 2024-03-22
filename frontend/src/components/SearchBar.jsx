

const SearchBar = ({ setPostings }) => {


    const fetchData = async (e) => {
        try {
            const response = await fetch(`http://4300showcase.infosci.cornell.edu:5185/regular?q=${e.target.value}`);
            const data = await response;
            console.log("I am data: " + data)
            setPostings(data.postings);
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