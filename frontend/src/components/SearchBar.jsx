import React from 'react';
import { useState } from 'react';
import CompanyPostings from './CompanyPostings';


const SearchBar = () => {
    const [postings, setPostings] = useState([])

    const fetchData = async (e) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/regular?q=${e.target.value}`);
            const data = await response.json();
            console.log(data)
            setPostings(data.postings);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }



    return (
        <>

            <input
                type="text"
                placeholder="Search for a job title, company or skills"
                id="filter-text-val"
                onChange={fetchData}
            />


            {Object.entries(postings).map(([company, data]) => (<CompanyPostings company={company} data={data} />))}
            {postings}


        </>


    )


}


export default SearchBar;

