import { Accordion, Button } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import ExpandedSearchForm from './ExpandedSearchForm';

function CustomToggle({ eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => { }
    );

    return (
        <Button className='w-100' variant="outline-info" onClick={decoratedOnClick}>Filter</Button>
    );
}

function CollapseContent({ eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => { },
    );

    return (
        <Button className='w-100' variant="outline-info" onClick={decoratedOnClick}>Apply Filter</Button>
    );
}


const FilterAccordion = () => {
    return (
        <Accordion defaultActiveKey="0" className='col-md-6 mx-auto'>
            <CustomToggle eventKey="0"></CustomToggle>
            <Accordion.Collapse eventKey="0">
                <>
                    <Card.Body><ExpandedSearchForm /></Card.Body>
                    <CollapseContent eventKey="0">Apply Filter</CollapseContent>
                </>
            </Accordion.Collapse>
        </Accordion>
    );
}

export default FilterAccordion;