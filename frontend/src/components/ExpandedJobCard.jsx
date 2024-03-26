import React from "react";
import { Card, Button } from "react-bootstrap/";

const ExpandedJobCard = ({ posting }) => {
  return (
    <Card className="bg-light w-90 px-0 py-0 hover-shadow shadow-sm">
      <Card.Body>
        <Card.Title>{posting.role}</Card.Title>
        <Card.Text>{/* {posting.description} */}</Card.Text>

        <div className="mb-3">
          <p>Company: {posting.company}</p>
          <p>
            Location: {posting.city}, {posting.country}
          </p>
          <p>Salary Range: {posting["salary range"]}</p>
          <p>Posted on: {posting.date}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ExpandedJobCard;
