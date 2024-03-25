import { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';

const SearchBar = ({ setPostings }) => {

    const [query, setQuery] = useState("")

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const delay = 200;

        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [query]);


    const fetchData = async (query) => {
        try {
            const response = await fetch(`http://4300showcase.infosci.cornell.edu:5185/regular?q=${query}`);
            const data = await response.json();
            setPostings(data.postings);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleInputChange = (e) => {
        setQuery(e.target.value)
        fetchData(query);
        setIsLoading(true);
    };


    return (
        <>
            <div className="w-75 flex">

                <div className="flex  w-100 flex-row input-box center-content">
                    <img src="/mag.png" alt="Search Icon" className='col-2' ></img>

                    <input
                        type="text"
                        placeholder="Search for a job title, company or skills"
                        id="filter-text-val"
                        onChange={handleInputChange}
                        className='col-8 text-center'
                    />

                    {isLoading &&
                        <div className="col-2">
                            <Spinner animation="border" size="sm" variant="primary" />
                        </div>
                    }


                </div >



            </div>
        </>
    )


}


export default SearchBar;

