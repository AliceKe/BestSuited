import { useState } from "react";

import "./App.css";
import CompanyCard from "./components/CompanyCard";
import SearchBar from "./components/SearchBar";
import DisplayOption from "./components/DisplayOption";
import { groupPostingsByCompany } from "./static/script";
import PostingCard from "./components/PostingCard";
import ResumeUpload from "./components/ResumeUpload";

const sortParams = {
  Companies: ["Rating", "Name"],
  "Job Postings": ["Rank", "Role"],
};

function App() {
  const [postings, setPostings] = useState([]);

  const [groupBy, setGroupBy] = useState("Companies");
  const [sortBy, setSortBy] = useState(sortParams.Companies[0]);

  const companyPostings = groupPostingsByCompany(postings);

  return (
    <>
      <div className="container-fluid bg-light">
        <div className="top-text">
          <div className="jumbotron bg-light w-100 mb-3 pt-3 rounded-3">
            <h1 className="display-2 text-dark text-center py-auto pt-3 poppins-font">
              BestSuited
            </h1>
            <h3 className="display-8 text-center poppins-font">
              Jobs Tailored for You
            </h3>
          </div>
          <SearchBar setPostings={setPostings} />

          <div className="row mt-3 justify-content-around">
            <DisplayOption
              value={groupBy}
              setHandler={setGroupBy}
              variant="outline-primary"
              type="List"
              options={Object.keys(sortParams)}
              cls="rounded-start-pill me-3"
            />

            {/* <FilterAccordion /> */}
            <ResumeUpload setPostings={setPostings}></ResumeUpload>
            {groupBy === "Companies" && (
              <DisplayOption
                value={sortParams.Companies[0]}
                setHandler={setSortBy}
                variant="outline-success"
                type="Sort By"
                options={sortParams.Companies}
                cls="rounded-end-pill ms-3 "
              />
            )}
            {groupBy === "Job Postings" && (
              <DisplayOption
                value={sortParams["Job Postings"][0]}
                setHandler={setSortBy}
                variant="outline-success"
                type="Sort By"
                options={sortParams["Job Postings"]}
                cls="rounded-end-pill ms-3 "
              />
            )}
          </div>

          {groupBy === "Job Postings" && (
            <div class="row mt-1 w-100">
              {postings.map((posting) => (
                <PostingCard posting={posting} />
              ))}
            </div>
          )}

          {groupBy === "Companies" && (
            <div class="row mt-1 w-100">
              {companyPostings.map((companyData, key) => (
                <CompanyCard
                  key={key}
                  companyName={companyData.name}
                  data={companyData}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
