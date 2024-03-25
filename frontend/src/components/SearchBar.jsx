import { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';

const SearchBar = ({ setPostings }) => {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showCards, setShowCards] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://4300showcase.infosci.cornell.edu:5185/regular?q=${query}`);
                const data = await response.json();
                setPostings(data.postings);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (showCards) {
            fetchData();
        }
    }, [query, setPostings, showCards]);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue);
        setShowCards(false);
        if (inputValue.trim() !== "") {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        setShowCards(true);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setShowCards(true);
        }
    };

    return (
        <div className="w-75 flex">
            <div className="flex w-100 flex-row input-box center-content position-relative">
                <img src="/mag.png" alt="Search Icon" className='col-2 start-0' onClick={handleSearch} style={{ cursor: 'pointer' }} />
                <input
                    type="text"
                    placeholder="Search for a job title, company or skills"
                    id="filter-text-val"
                    value={query}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className='col-8 text-center'
                />
                {isLoading &&
                    <div className="position-absolute end-0 top-50 translate-middle-y pe-3">
                        <Spinner animation="border" size="sm" variant="primary" />
                    </div>
                }
            </div>
        </div>
    );
}

export default SearchBar;
