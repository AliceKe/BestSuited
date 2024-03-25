import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { backendUrl } from '../static/script';

const ResumeUpload = ({ setPostings }) => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);


  const fetchData = async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    setUploadStatus('Uploading...');
    try {
      const response = await fetch(`${backendUrl.remote}/resume`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setPostings(data.postings);
        setUploadStatus('Upload successful!');
        setErrorMessage('');
      } else {
        throw new Error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Error uploading file. Please try again.');
      setUploadStatus('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target.elements.formFile.files[0];
    if (file) {
      fetchData(file);
    } else {
      console.error('No file selected');
      setErrorMessage('No file selected. Please choose a file to upload.');
    }
  };

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className='col-md-6'>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            id="formFile"
            type="file"
            aria-describedby="inputGroupFileAddon"
            onChange={handleChange}
          />
          <Button variant="outline-warning" type="submit" id="inputGroupFileAddon" className='text-black'>
            Upload
          </Button>
        </InputGroup>
      </Form>

      {uploadStatus && <Alert variant="info">{uploadStatus}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </div>
  );
};

export default ResumeUpload;
