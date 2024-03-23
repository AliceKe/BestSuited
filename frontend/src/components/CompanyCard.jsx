import { useState } from "react";
import defaultImage from '../images/favicon.png';
import PostingsModal from "./PostingsModal";
import { Button, Card } from 'react-bootstrap/';


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

        <div className="col-md-2 mx-3 my-3 ">

            <Card style={{ width: '18rem' }} className="bg-light">
                <Card.Img variant="top" src={image || `https://logo.clearbit.com/${companyName.replace(/\s+/g, '').toLowerCase()}.com?size=200`} />
                <Card.Body>
                    <Card.Title>{companyName}</Card.Title>
                    <Card.Text>
                        {/* {data.description} */}
                    </Card.Text>
                    <Button className="btn-light btn-outline-primary" onClick={() => setShow(true)}>View all {data.postings.length} postings</Button>
                    <p className="card-text">{data.rating}</p>

                    <PostingsModal show={show} handleClose={handleClose} company={companyName} postings={data.postings} />


                </Card.Body>
            </Card>
        </div>



    )
}

export default CompanyCard;
