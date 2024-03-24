import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const ResumeUpload = ({ setPostings }) => {

  const fetchData = async (file) => {
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch(`http://4300showcase.infosci.cornell.edu:5185/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setPostings(data.postings);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target.elements.formFile.files[0];
    if (file) {
      fetchData(file);
    } else {
      console.error('No file selected');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          id="formFile"
          type="file"
          aria-describedby="inputGroupFileAddon"
        />
        <Button variant="primary" type="submit" id="inputGroupFileAddon">
          Upload
        </Button>
      </InputGroup>
    </Form>
  );
}

export default ResumeUpload;
