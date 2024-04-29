import { Accordion, Button } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import ExpandedSearchForm from "./ExpandedSearchForm";

function CustomToggle({ eventKey, setExpandTextSearch }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    setExpandTextSearch(false)
  );

  return (
    <Button
      className="w-100 mr-3 text-dark"
      variant="warning"
      onClick={decoratedOnClick}
    >
      {" "}
      Filter
    </Button>
  );
}

const FilterAccordion = ({
  setFilters,
  applyFilters,
  updateFilteredPostings,
  setExpandTextSearch,
}) => {
  return (
    <Accordion defaultActiveKey={null} className="">
      <div className="flexflex-row justify-space-around">
        <CustomToggle
          setExpandTextSearch={setExpandTextSearch}
          eventKey="0"
        ></CustomToggle>
      </div>

      <Accordion.Collapse eventKey="0">
        <Card.Body>
          <ExpandedSearchForm
            setFilters={setFilters}
            applyFilters={applyFilters}
            updateFilteredPostings={updateFilteredPostings}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default FilterAccordion;
