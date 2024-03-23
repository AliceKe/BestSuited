
const SearchBar = ({ setPostings }) => {

    const fetchData = async (e) => {
        try {
            const response = await fetch(`http://4300showcase.infosci.cornell.edu:5185/regular?q=${e.target.value}`);
            const data = await response.json();
            setPostings(data.postings);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return (
        <>
            <div className="searchbar-container w-75">

                <div className="flex w-100 flex-row input-box center-content">
                    <img src="/mag.png" alt="Search Icon" className='col-2' ></img>


                    <input
                        type="text"
                        placeholder="Search for a job title, company or skills"
                        id="filter-text-val"
                        onChange={fetchData}
                        className='col-10 text-center'
                    />
                </div >

            </div>
        </>
    )


}


export default SearchBar;

