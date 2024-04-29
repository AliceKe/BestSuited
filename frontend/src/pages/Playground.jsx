import { useState } from "react"


import CompanyCard from '../components/CompanyCard';
import SearchBar from '../components/SearchBar';
import DisplayOption from "../components/DisplayOption";
import { companiesSortBy, groupPostingsByCompany } from "../static/script";
import PostingCard from "../components/PostingCard";
import ResumeUpload from "../components/ResumeUpload";
import FilterAccordion from "../components/FilterAccordion";
import PostingsModal from "../components/PostingsModal";

const sortParams = { "Companies": ["Default", "Rating", "Name"], "Job Postings": ["Rank", "Role"] }


function Playground() {
    const [postings, setPostings] = useState([])
    const [companiesPostings, setCompaniesPostings] = useState([])


    const [groupBy, setGroupBy] = useState("Companies")
    const [sortBy, setSortBy] = useState(sortParams.Companies[0])

    const [expandTextSearch, setExpandTextSearch] = useState(false);

    const [filters, setFilters] = useState({ "country": [], "role": [], "skills": [] })


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);


    const handlePostingsUpdate = (data) => {
        setPostings(data);
        setCompaniesPostings(groupPostingsByCompany(data));
        // handleSorting(sortBy);
    }

    const handleSorting = (val) => {
        if (["Rating", "Name"].indexOf(val) !== -1) {
            let tmp = companiesSortBy(companiesPostings, val);
            setCompaniesPostings(tmp)
        }
        setSortBy(val);
    }

    const updateFilteredPostings = (filteredData) => {

    };

    const applyFilters = () => {
        console.log(filters)
        let tmpPostings = []
        console.log(postings[0])
        for (let posting of postings) {
            for (let [filterKey, filterValue] of Object.entries(filters)) {
                if (filterValue.length !== 0) {
                    if (filterValue.includes(posting[filterKey])) {
                        tmpPostings.push(posting);
                    }
                }
            }
        }
        console.log(tmpPostings)
        setPostings(tmpPostings);
        setCompaniesPostings(groupPostingsByCompany(tmpPostings));
    }

    return (
        <>
            <h2 className="display-2 text-light text-center py-auto pt-3 poppins-font">
                BestSuited
            </h2>
            {/* <h5 className="display-8 text-light text-center poppins-font">
                Jobs Tailored for You
            </h5> */}

            <div className="w-100">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="row h-10 z-3 w-100 flex-column align-items-center justify-content-around" style={{ "height": "15%", "marginTop": "0" }}>
                        <SearchBar setPostings={handlePostingsUpdate} expandTextSearch={expandTextSearch} setExpandTextSearch={setExpandTextSearch} />
                        <div className="w-50 d-flex mt-3">
                            <DisplayOption value={groupBy} setHandler={setGroupBy} variant="primary" type="List" options={Object.keys(sortParams)} cls="rounded-start-pill me-3" />
                            <ResumeUpload setPostings={handlePostingsUpdate}></ResumeUpload>
                            {groupBy === "Companies" && <DisplayOption value={sortBy} setHandler={handleSorting} variant="success" type="Sort By" options={sortParams.Companies} cls="rounded-end-pill ms-3 " />}
                            {groupBy === "Job Postings" && <DisplayOption value={sortBy} setHandler={handleSorting} variant="success" type="Sort By" options={sortParams["Job Postings"]} cls="rounded-end-pill ms-3 " />}
                        </div>

                        <div className="d-flex w-100 align-items-center justify-content-center">
                            <FilterAccordion applyFilters={applyFilters} setFilters={setFilters} setExpandTextSearch={setExpandTextSearch} />
                        </div>
                    </div>

                    <div className="w-100 d-flex align-items-center justify-content-center"  >
                        {
                            groupBy === "Job Postings" &&
                            <>
                                <table class="table border border-5 mt-3 shadow-lg w-50">
                                    <tbody>
                                        {postings.map((posting) => (<PostingCard posting={posting} />))}
                                    </tbody>
                                </table>
                            </>
                        }

                        {
                            groupBy === "Companies" &&
                            <>
                                <table class="table border border-5 mt-3 shadow-lg w-50">
                                    <tbody>
                                        {companiesPostings.map((companyData, key) => (<CompanyCard key={key} companyName={companyData.name} data={companyData} setShow={setShow} />))}
                                    </tbody>
                                </table>
                            </>
                        }

                    </div>
                </div >

            </div >
        </>
    );
}


export default Playground;
