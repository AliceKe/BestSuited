import React, { useState, useEffect } from 'react';

const SearchBar = ({ setPostings }) => {

    const fetchData = async (e) => {
        try {
            const response = await fetch(`http://127.0.0.1:5001/jobs?q=${e.target.value}`);
            const data = await response.json();
            setPostings(data.postings);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return (
        <>
            <div className="searchbar-container">

                <div class="flex flex-row input-box center-content">
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

