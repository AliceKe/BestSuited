import { useState } from "react";
import defaultImage from "../images/favicon.png";
import { Button, Card } from "react-bootstrap/";
import CompanyRating from "./Rating";
import JobModal from "./JobModal";

const PostingCard = ({ posting }) => {
  const [image, setImage] = useState("");
  const [imageNotFound, setImageNotFound] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleImageNotFound = () => {
    if (!imageNotFound) {
      setImageNotFound(true);
      setImage(defaultImage);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="col-md-3 col-sm-6 px-3 my-3 zoom">
      <Card
        className="bg-light w-90 px-0 py-0 hover-shadow shadow-sm"
        onClick={handleShowModal}
      >
        <Card.Body>
          <Card.Title className="flex">
            <img
              src={
                image ||
                `https://logo.clearbit.com/${posting.company
                  .replace(/\s+/g, "")
                  .toLowerCase()}.com?size=20`
              }
              onError={handleImageNotFound}
              alt=""
            />{" "}
            {posting.role}
          </Card.Title>
          <Card.Text>{/* {data.description} */}</Card.Text>

          <div className="d-flex flex-column">
            <div>
              <p>{posting["salary range"]}</p>
            </div>
            <div>
              <p>
                {posting.city}, {posting.country}
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
      {showModal && (
        <JobModal
          show={showModal}
          handleClose={handleCloseModal}
          posting={posting}
        />
      )}
    </div>
  );
};

export default PostingCard;
