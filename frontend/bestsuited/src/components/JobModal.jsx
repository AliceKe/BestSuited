import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const JobModal = ( {company_jobs} ) => {
  const [show, setShow] = useState(false);
  const jobs_by_company = {
    "Microsoft": {
        "description": "We believe in what people make possible\n\nMicrosoft enables digital transformation for the era of an intelligent cloud and an intelligent edge. Our mission is to empower every person and every organization on the planet to achieve more.",
        "rating": "4.2",
        "happiness": "{'Work Happiness Score': '83', 'Learning': '85', 'Appreciation': '84', 'Purpose': '84', 'Flexibility': '84', 'Achievement': '83', 'Inclusion': '82', 'Support': '82', 'Energy': '81', 'Trust': '79', 'Compensation': '79', 'Belonging': '78', 'Management': '77'}",
        "postings": [
            {
                "company": "Microsoft",
                "happiness": "{'Work Happiness Score': '83', 'Learning': '85', 'Appreciation': '84', 'Purpose': '84', 'Flexibility': '84', 'Achievement': '83', 'Inclusion': '82', 'Support': '82', 'Energy': '81', 'Trust': '79', 'Compensation': '79', 'Belonging': '78', 'Management': '77'}",
                "rating": "4.2",
                "description": "We believe in what people make possible\n\nMicrosoft enables digital transformation for the era of an intelligent cloud and an intelligent edge. Our mission is to empower every person and every organization on the planet to achieve more.",
                "role": "Network Security Engineer",
                "salary range": "$60K-$108K",
                "skills": "Network security protocols and technologies Firewalls and intrusion detection systems Vulnerability assessment and penetration testing Security policy development and enforcement Incident response and recovery",
                "country": "Oman",
                "id": 98145,
                "city": "Muscat",
            },
            {
                "company": "Microsoft",
                "happiness": "{'Work Happiness Score': '83', 'Learning': '85', 'Appreciation': '84', 'Purpose': '84', 'Flexibility': '84', 'Achievement': '83', 'Inclusion': '82', 'Support': '82', 'Energy': '81', 'Trust': '79', 'Compensation': '79', 'Belonging': '78', 'Management': '77'}",
                "rating": "4.2",
                "description": "We believe in what people make possible\n\nMicrosoft enables digital transformation for the era of an intelligent cloud and an intelligent edge. Our mission is to empower every person and every organization on the planet to achieve more.",
                "role": "Crisis Communication Manager",
                "salary range": "$63K-$90K",
                "skills": "Crisis communication planning Crisis response Media relations Reputation management Stakeholder communication",
                "country": "St. Martin (French part)",
                "id": 96663,
                "city": "Marigot",
            },
        ],
    },
    "JP Morgan": {
        "description": "For over 200 years, JPMorgan Chase & Co has provided innovative financial solutions for consumers, small businesses, corporations, governments and institutions around the world.Today, we're a leading global financial services firm with operations servicing clients in more than 100 countries. Whether we are serving customers, helping small businesses, or putting our skills to work with partners, we strive to identify issues and propose solutions that will propel the future and strengthen both our clients and our communities.\n\n\u00a9 2019 JPMorgan Chase & Co. JPMorgan Chase is an equal opportunity and affirmative action employer Disability/Veteran. \u2013 less",
        "rating": "3.9",
        "happiness": "{'Work Happiness Score': '66', 'Learning': '73', 'Achievement': '73', 'Purpose': '71', 'Appreciation': '71', 'Flexibility': '70', 'Support': '69', 'Compensation': '68', 'Inclusion': '68', 'Energy': '67', 'Trust': '64', 'Belonging': '64', 'Management': '63'}",
        "postings": [
            {
                "company": "JPMorgan Chase",
                "happiness": "{'Work Happiness Score': '66', 'Learning': '73', 'Achievement': '73', 'Purpose': '71', 'Appreciation': '71', 'Flexibility': '70', 'Support': '69', 'Compensation': '68', 'Inclusion': '68', 'Energy': '67', 'Trust': '64', 'Belonging': '64', 'Management': '63'}",
                "rating": "3.9",
                "description": "For over 200 years, JPMorgan Chase & Co has provided innovative financial solutions for consumers, small businesses, corporations, governments and institutions around the world.Today, we're a leading global financial services firm with operations servicing clients in more than 100 countries. Whether we are serving customers, helping small businesses, or putting our skills to work with partners, we strive to identify issues and propose solutions that will propel the future and strengthen both our clients and our communities.\n\n\u00a9 2019 JPMorgan Chase & Co. JPMorgan Chase is an equal opportunity and affirmative action employer Disability/Veteran. \u2013 less",
                "role": "UI/UX Developer",
                "salary range": "$65K-$104K",
                "skills": "User interface (UI) design User experience (UX) design Web design principles Prototyping and wireframing Front-end development languages (e.g., HTML, CSS, JavaScript) Interaction design User testing Responsive design Usability testing Collaboration Attention to detail",
                "country": "Cyprus",
                "id": 289597,
                "city": "Nicosia",
            },
            {
                "company": "JPMorgan Chase",
                "happiness": "{'Work Happiness Score': '66', 'Learning': '73', 'Achievement': '73', 'Purpose': '71', 'Appreciation': '71', 'Flexibility': '70', 'Support': '69', 'Compensation': '68', 'Inclusion': '68', 'Energy': '67', 'Trust': '64', 'Belonging': '64', 'Management': '63'}",
                "rating": "3.9",
                "description": "For over 200 years, JPMorgan Chase & Co has provided innovative financial solutions for consumers, small businesses, corporations, governments and institutions around the world.Today, we're a leading global financial services firm with operations servicing clients in more than 100 countries. Whether we are serving customers, helping small businesses, or putting our skills to work with partners, we strive to identify issues and propose solutions that will propel the future and strengthen both our clients and our communities.\n\n\u00a9 2019 JPMorgan Chase & Co. JPMorgan Chase is an equal opportunity and affirmative action employer Disability/Veteran. \u2013 less",
                "role": "Usability Analyst",
                "salary range": "$64K-$117K",
                "skills": "Usability evaluation User interface assessment Usability testing tools and techniques",
                "country": "Mexico",
                "id": 288296,
                "city": "Mexico City",
            },
        ],
    }
}


  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        View all jobs
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {jobs_by_company.array.map((company) => {
                console.log(company);
                
            })
            };
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>

          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default JobModal;