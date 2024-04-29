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
            setImage(null);
        }
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return (
        <>
            <tr key={companyName} className="">
                <th className="text-primary" scope="row">
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
                </th>
                <td className="text-dark">
                    {companyName}
                </td>
                <td className="text-primary"> <CompanyRating value={data.rating} /></td>
                <td>
                    <Button
                        variant="outline-primary"
                        className="border-0 border-bottom border-primary mx-auto text-center"
                        onClick={() => setShow(true)}
                    >
                        See {data.postings.length} postings
                    </Button>
                </td>
            </tr>
            <PostingsModal
                show={show}
                handleClose={handleClose}
                company={companyName}
                postings={data.postings}
            />
        </>
    );
};

export default CompanyCard;
