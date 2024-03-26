import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { backendUrl } from "../static/script";

const SearchBar = ({ setPostings }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const delay = 500;
    let timeoutId;

    if (isTyping) {
      timeoutId = setTimeout(() => {
        setIsLoading(true);
        setIsTyping(false);
        fetchData();
      }, delay);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, isTyping, setPostings]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${backendUrl.local}/regular?q=${query}`);
      const data = await response.json();
      setPostings(data.postings);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setIsTyping(true);
  };

  return (
    <div className="w-75 flex">
      <div className="flex w-100 flex-row input-box bg-light center-content">
        <img src="/mag.png" alt="Search Icon" className="col-2" />

        <input
          type="text"
          placeholder="Search for a job title, company or skills"
          id="filter-text-val"
          onChange={handleChange}
          className="col-8 text-center bg-light fs-3 text-dark"
        />

        {isTyping && (
          <div className="col-2">
            <Spinner animation="border" size="sm" variant="primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
