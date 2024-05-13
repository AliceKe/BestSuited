import { useState } from "react";

import CompanyCard from "../components/CompanyCard";
import SearchBar from "../components/SearchBar";
import { companiesSortBy, groupPostingsByCompany } from "../static/script";
import PostingCard from "../components/PostingCard";
import AccordionSection from "../components/AccordionSection";
import SVDGraph from "../SVDGraph";

const companySortParams = ["Rating", "Name"];

function Playground() {
  const [originalPostings, setOriginalPostings] = useState([]);
  const [postings, setPostings] = useState([]);
  const [companiesPostings, setCompaniesPostings] = useState([]);

  const [groupBy, setGroupBy] = useState("Companies");
  const [sortBy, setSortBy] = useState(companySortParams[0]);
  const [salaryRange, setSalaryRange] = useState([]);

  const [expandTextSearch, setExpandTextSearch] = useState(false);

  const [filters, setFilters] = useState({ country: [], role: [], skills: [] });

  const [show, setShow] = useState(false);

  const handlePostingsUpdate = (data) => {
    setPostings(data);
    setOriginalPostings(data);
    setCompaniesPostings(groupPostingsByCompany(data));

    let minVal = 99999;
    let maxVal = 0;
    for (let posting of originalPostings) {
      const [minSalary, maxSalary] = posting["salary range"]
        .split("-")
        .map((part) => parseInt(part.replace(/\D/g, ""), 10));

      console.log(minSalary, maxSalary);
      minVal = Math.min(minVal, minSalary);
      maxVal = Math.max(maxVal, maxSalary);
    }

    setSalaryRange([minVal * 1000, maxVal * 1000]);
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
          if (filterKey === "salary range") {
            const [minSalary, maxSalary] = posting["salary range"]
              .split("-")
              .map((part) => parseInt(part.replace(/\D/g, ""), 10));

            if (
              minSalary * 1000 < filterValue[0] &&
              maxSalary * 1000 > filterValue[1]
            ) {
              flag = false;
            }
          } else if (!filterValue.includes(posting[filterKey])) {
            console.log(filterKey);
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
              salaryRange={salaryRange}
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
