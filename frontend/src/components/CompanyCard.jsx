import { useState } from "react";
import defaultImage from '../images/favicon.png';
import PostingsModal from "./PostingsModal";
import { Button, Card } from 'react-bootstrap/';
import CompanyRating from "./Rating";


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

    return (

        <div className="col-md-3 col-sm-6 px-3 my-3 zoom">

            <Card className="bg-light w-90 px-0 py-0">

                <Card.Body>
                    <Card.Title className="flex" >
                        <img src={image || `https://logo.clearbit.com/${companyName.replace(/\s+/g, '').toLowerCase()}.com?size=20`} onError={handleImageNotFound}
                            alt="" /> {companyName}
                    </Card.Title>
                    <Card.Text>
                        {/* {data.description} */}
                    </Card.Text>

                    <div className="d-block align-items-center justify-content-between">
                        <CompanyRating value={data.rating} />
                        <Button className="btn-light btn-outline-primary" onClick={() => setShow(true)}>See {data.postings.length} postings</Button>
                    </div>

                    <PostingsModal show={show} handleClose={handleClose} company={companyName} postings={data.postings} />


                </Card.Body>
            </Card>
        </div>



    )
}

export default CompanyCard;
