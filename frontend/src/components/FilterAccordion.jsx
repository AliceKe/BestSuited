import { Accordion, Button } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import ExpandedSearchForm from './ExpandedSearchForm';

function CustomToggle({ eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <Button variant="outline-info" onClick={decoratedOnClick}>Filter</Button>
    );
}

const FilterAccordion = () => {
    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <CustomToggle eventKey="0"></CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body><ExpandedSearchForm /></Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default FilterAccordion;