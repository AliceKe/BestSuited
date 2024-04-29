import { useState } from "react";

import CompanyCard from "../components/CompanyCard";
import SearchBar from "../components/SearchBar";
import { companiesSortBy, groupPostingsByCompany } from "../static/script";
import PostingCard from "../components/PostingCard";
import AccordionSection from "../components/AccordionSection";

const companySortParams = ["Rating", "Name"];

function Playground() {
  const [originalPostings, setOriginalPostings] = useState([]);
  const [postings, setPostings] = useState([]);
  const [companiesPostings, setCompaniesPostings] = useState([]);

  const [groupBy, setGroupBy] = useState("Companies");
  const [sortBy, setSortBy] = useState(companySortParams[0]);

  const [expandTextSearch, setExpandTextSearch] = useState(false);

  const [filters, setFilters] = useState({ country: [], role: [], skills: [] });

  const [show, setShow] = useState(false);

  const handlePostingsUpdate = (data) => {
    setPostings(data);
    setOriginalPostings(data);
    setCompaniesPostings(groupPostingsByCompany(data));
  };

  const handleSorting = (val) => {
    if (["Rating", "Name"].indexOf(val) !== -1) {
      let tmp = companiesSortBy(companiesPostings, val);
      setCompaniesPostings(tmp);
    }
    setSortBy(val);
  };

  const applyFilters = () => {
    let tmpPostings = [];
    for (let posting of originalPostings) {
      let flag = true;
      for (let [filterKey, filterValue] of Object.entries(filters)) {
        if (filterValue.length !== 0) {
          if (!filterValue.includes(posting[filterKey])) {
            flag = false;
          }
        }
      }

      if (flag) {
        tmpPostings.push(posting);
      }
    }
    setPostings(tmpPostings);
    setCompaniesPostings(groupPostingsByCompany(tmpPostings));
  };

  return (
    <>
      <h2 className="display-2 text-light text-center py-auto pt-3 poppins-font">
        BestSuited
      </h2>

      <div className="w-100">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div
            className="row z-3 w-100 flex-column align-items-center justify-content-around"
            style={{ height: "15%", marginTop: "0" }}
          >
            <SearchBar
              setPostings={handlePostingsUpdate}
              expandTextSearch={expandTextSearch}
              setExpandTextSearch={setExpandTextSearch}
            />
            <AccordionSection
              groupBy={groupBy}
              setGroupBy={setGroupBy}
              sortBy={sortBy}
              handleSorting={handleSorting}
              handlePostingsUpdate={handlePostingsUpdate}
              applyFilters={applyFilters}
              setFilters={setFilters}
              setExpandTextSearch={setExpandTextSearch}
            />
          </div>

          {postings.length > 0 && (
            <div className="w-100 d-flex align-items-center justify-content-center">
              {groupBy === "Job Postings" && (
                <>
                  <table className="table table-hover table-striped border border-5 mt-3 shadow-lg w-50">
                    <thead>
                      <tr>
                        <th className="text-primary bold" scope="col"></th>
                        <th className="text-black bold" scope="col">
                          Role
                        </th>
                        <th className="text-dark bold" scope="col">
                          Company
                        </th>
                        <th className="text-primary bold" scope="col">
                          Location
                        </th>
                        <th className="text-black bold" scope="col">
                          Salary
                        </th>
                        <th className="text-secondary bold" scope="col">
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {postings.map((posting) => (
                        <PostingCard posting={posting} />
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              {groupBy === "Companies" && (
                <>
                  <table className="table table-hover table-striped border border-5 mt-3 shadow-lg w-50">
                    <thead>
                      <tr>
                        <th className="text-primary bold" scope="col"></th>
                        <th className="text-black bold" scope="col">
                          Company
                        </th>
                        <th className="text-dark bold" scope="col">
                          Rating
                        </th>
                        <th className="text-primary bold" scope="col">
                          Postings Link
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {companiesPostings.map((companyData, key) => (
                        <CompanyCard
                          key={key}
                          companyName={companyData.name}
                          data={companyData}
                          setShow={setShow}
                        />
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Playground;
