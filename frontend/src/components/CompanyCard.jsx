import { useState } from "react";
import defaultImage from '../images/favicon.png';
import PostingsModal from "./PostingsModal";
import Button from 'react-bootstrap/Button';


const CompanyCard = ({ companyName, data }) => {
    const [image, setImage] = useState("")
    const [imageNotFound, setImageNotFound] = useState(false);

    const handleImageNotFound = () => {
        if (!imageNotFound) {
            setImageNotFound(true);
            setImage(defaultImage);
        }
    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className="card col-md-4 bg-light">
            <img className="card-img-top" src={image || `https://logo.clearbit.com/${companyName.replace(/\s+/g, '').toLowerCase()}.com?size=200`}
                alt="Company Logo not found"
                onError={handleImageNotFound}
            ></img>

            <div className="card-body">
                <h5 className="card-title">{companyName}</h5>
                <p className="card-text">{data.rating}</p>
            </div>

            <Button className="btn-light btn-outline-primary" onClick={() => setShow(true)}>View all {data.postings.length} postings</Button>

            <PostingsModal show={show} handleClose={handleClose} company={companyName} postings={data.postings} />
        </div>

    )
}

export default CompanyCard;
