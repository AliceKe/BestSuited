import { useState, useEffect } from "react";
import { backendUrl } from "../static/script";
import { InputGroup, Button } from "react-bootstrap";
import SVDGraph from "./SVDGraph";

const SearchBar = ({ showPlot, setShowPlot, setPostings, setPlotData, plotData, expandTextSearch, setExpandTextSearch }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);


  const handleExpand = () => {
    setExpandTextSearch(!expandTextSearch);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${backendUrl.local}/regular?q=${query}`);
      const data = await response.json();
      setPostings(query.trim().length > 0 ? data.postings : []);
      setPlotData(query.trim().length > 0 ? data.plot : null)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
  }, [query, isTyping, setPostings, fetchData]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setIsTyping(true);
  };

  return (
    <div className="d-flex w-50">

      <InputGroup className="search-bar">
        {/* {expandTextSearch && ( */}
        <input
          type="search"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
          className={`search-input form-control ${expandTextSearch ? "expandTextSearch" : "collapsed"
            }`}
          onChange={handleChange}
          style={{
            height: "40px" /* set minimum width */,
            maxHeight: "100px" /* set minimum height */,
            maxWidth: "95%",
          }}
        />
      </InputGroup>


    </div>
  );
};

export default SearchBar;