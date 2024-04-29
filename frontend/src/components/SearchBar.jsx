import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { backendUrl } from "../static/script";
import { InputGroup, FormControl, Button } from "react-bootstrap";

const SearchBar = ({ setPostings, expandTextSearch, setExpandTextSearch }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleExpand = () => {
    setExpandTextSearch(!expandTextSearch);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${backendUrl.remote}/regular?q=${query}`);
      const data = await response.json();
      setPostings(query.trim().length > 0 ? data.postings : []);
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
      <Button
        variant="secondary"
        onClick={handleExpand}
        className="btn-sm"
        style={{ height: "40px", width: "200px" }}
      >
        <img src="/mag.png" alt="Search Icon" height={"20"} />
        Type to Search
      </Button>

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
        {/* )} */}
        {/* {isTyping && (
          <div className="col-2">
            <Spinner animation="border" size="sm" variant="primary" />
          </div>
        )} */}
      </InputGroup>
    </div>
  );
};

export default SearchBar;
