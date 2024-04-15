import { Accordion, Button } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import ExpandedSearchForm from './ExpandedSearchForm';


function CustomToggle({ eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );


    return (
        <Button className='w-100 mr-3 text-dark' variant="outline-warning" onClick={decoratedOnClick}>Expanded Form Search</Button>
    );
}

function CollapseContent({ eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => { },
    );

    return (
        <Button className='w-50 ml-3' variant="outline-info" onClick={decoratedOnClick}>Apply Filter</Button>
    );
}



const FilterAccordion = ({ updateFilteredPostings }) => {
    return (
        <Accordion defaultActiveKey={null} className='col-md-6 mx-auto'>
            <div className="flex flex-row justify-space-around">
                <CustomToggle eventKey="0"></CustomToggle>
            </div>

            <Accordion.Collapse eventKey="0">
                <>
                    <Card.Body><ExpandedSearchForm updateFilteredPostings={updateFilteredPostings} /></Card.Body>
                </>
            </Accordion.Collapse>
        </Accordion>
    );
}


export default FilterAccordion;
