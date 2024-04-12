import { useState } from "react";
import defaultImage from "../images/favicon.png";
import PostingsModal from "./PostingsModal";
import { Button, Card } from "react-bootstrap/";
import CompanyRating from "./Rating";

const borderClasses = [
    // " border-bottom-2 border-primary",
    // "border-secondary",
    // "border-success",
    // "border-danger",
    // "border-warning",
    "border-info",
    // "border-light",
    // "border-dark"
];

const chooseRandomColor = () => {
    if (borderClasses.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * borderClasses.length);
    return borderClasses[randomIndex];
}


const CompanyCard = ({ companyName, data }) => {
    const [image, setImage] = useState("");
    const [imageNotFound, setImageNotFound] = useState(false);
    const handleImageNotFound = () => {
        if (!imageNotFound) {
            setImageNotFound(true);
            setImage(defaultImage);
        }
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 px-3 my-3 zoom border-primary">
            <Card className={"bg-white w-90 px-0 py-0 hover-shadow shadow-sm p-3 mb-3 bg-info rounded "}>
                <Card.Body>
                    <Card.Title className="flex">
                        <img
                            src={
                                image ||
                                `https://logo.clearbit.com/${companyName
                                    .replace(/\s+/g, "")
                                    .toLowerCase()}.com?size=20`
                            }
                            onError={handleImageNotFound}
                            alt=""
                        />{" "}
                        {companyName}
                    </Card.Title>
                    <Card.Text>{/* {data.description} */}</Card.Text>

                    <div className="d-flex flex-col align-items-center justify-content-center ">
                        <CompanyRating value={data.rating} />
                        <Button
                            variant="outline-primary"
                            className="border-0 border-bottom border-primary mx-auto text-center"
                            onClick={() => setShow(true)}
                        >
                            See {data.postings.length} postings
                        </Button>
                    </div>

                    <PostingsModal
                        show={show}
                        handleClose={handleClose}
                        company={companyName}
                        postings={data.postings}
                    />
                </Card.Body>
            </Card>
        </div>
    );
};

export default CompanyCard;
