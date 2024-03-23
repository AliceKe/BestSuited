import React, { useState, useEffect } from 'react';

const SearchBar = ({ setPostings }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const fetchData = async (searchQuery) => {
        try {
            const response = await fetch(`http://127.0.0.1:5001/jobs?q=${searchQuery}`);
            const data = await response.json();
            setPostings(data.postings);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        fetchData(query);
    }



    return (
        <>
            <div className="searchbar-container">
                <div class="input-box">
                    <img src="/mag.png" alt="Search Icon"></img>
                    <input
                        type="text"
                        placeholder="Search for a job title, company or skills"
                        id="filter-text-val"
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                </div >
            </div>
        </>
    )


}


export default SearchBar;

