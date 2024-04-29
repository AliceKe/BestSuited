import { Accordion, Button } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import ExpandedSearchForm from "./ExpandedSearchForm";
import DisplayOption from "./DisplayOption";
import ResumeUpload from "./ResumeUpload";


const companySortParams = ["Rating", "Name"]

function CustomToggle({ eventKey, setExpandTextSearch }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        setExpandTextSearch(false)
    );

    return (
        <Button className='rounded-end-pill pt-1 ms-3 mb-1' variant="warning" onClick={decoratedOnClick}> Filter </Button>
    );
}


const AccordionSection = ({ salaryRange, groupBy, setGroupBy, handleSorting, handlePostingsUpdate, sortBy, setFilters, applyFilters, updateFilteredPostings, setExpandTextSearch }) => {
    return (
        <Accordion defaultActiveKey={null} className='w-75 mx-auto d-flex justify-content-center align-items-center flex-column mt-3'>

            <div className="d-flex">
                <DisplayOption value={groupBy} setHandler={setGroupBy} variant="primary" type="List" options={["Companies", "Job Postings"]} cls="rounded-start-pill me-3" />
                <ResumeUpload setPostings={handlePostingsUpdate}></ResumeUpload>

                {groupBy === "Companies" ? <DisplayOption value={sortBy} setHandler={handleSorting} variant="success" type="Sort By" options={companySortParams} cls="rounded-end-pill ms-3" />
                    :
                    <CustomToggle setExpandTextSearch={setExpandTextSearch} eventKey="0"></CustomToggle>
                }
            </div>

            {groupBy === "Job Postings" &&
                <Accordion.Collapse eventKey="0">
                    <Card.Body><ExpandedSearchForm salaryRange={salaryRange} setFilters={setFilters} applyFilters={applyFilters} updateFilteredPostings={updateFilteredPostings} /></Card.Body>
                </Accordion.Collapse>}
        </Accordion>
    );
}


export default AccordionSection;
