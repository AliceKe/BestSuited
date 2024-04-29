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
    <>
      <tr key={posting.id} className="">
        <td className="text-primary" scope="row">
          <img
            src={
              image ||
              `https://logo.clearbit.com/${posting.company
                .replace(/\s+/g, "")
                .toLowerCase()}.com?size=20`
            }
            // onError={handleImageNotFound}
            alt=""
          />
        </td>
        <td className="text-dark">
          {posting.role}
        </td>
        <td className="text-dark">
          {posting.company}
        </td>
        <td className="text-primary">{posting.city}, {posting.country}</td>
        <td className="text-dark">
          {posting["salary range"]}
        </td>

        <td>
          <Button
            variant="outline-primary"
            className="border-0 border-bottom border-primary mx-auto text-center"
            onClick={handleShowModal}
          >
            View
          </Button>
        </td>
      </tr>
      {showModal && (
        <JobModal
          show={showModal}
          handleClose={handleCloseModal}
          posting={posting}
        />
      )}


    </>

  );
};

export default PostingCard;
