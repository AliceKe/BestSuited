import { useState } from "react";
import PostingsModal from "./PostingsModal";
import Button from 'react-bootstrap/Button';


const CompanyCard = ({ companyName, data }) => {
    const [showPostings, setShowPostings] = useState(false);


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className="card col-md-4 ml-3">
            <img className="card-img-top" src={data.image} alt="Card image cap"></img>
            <div className="card-body">
                <h5 className="card-title">{companyName}</h5>
                <p className="card-text">{data.rating}</p>
            </div>
            <div className="card-body">
                <a href="#" className="card-link">Company Site</a>
                <button onClick={setShowPostings}>View {data.postings.size} Jobs</button>
            </div>

            <Button variant="primary" onClick={handleShow}>
                View all {data.postings.length} postings
            </Button>

            <PostingsModal show={show} handleClose={handleClose} company={companyName} postings={data.postings} />
        </div>
    )
}

export default CompanyCard;