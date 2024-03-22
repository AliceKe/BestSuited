

const SearchBar = () => {


    const fetchData = (query) => {
        fetch(`http://4300showcase.infosci.cornell.edu:5184/text=${query}`)
            .then((e) => console.log(e))
            .catch((e) => console.log(e))

    }


    return (

        <input placeholder="Search for a job title, company or skills" id="filter-text-val"
            onKeyUp={fetchData}>

        </input>
    )

}

export default SearchBar;