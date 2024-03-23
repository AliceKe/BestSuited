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

        <div className="col-md-2 px-3 my-3 ">

            <Card className="bg-light w-90 px-0 py-0">

                <Card.Body>
                    <Card.Title className="flex" >
                        <img src={image || `https://logo.clearbit.com/${companyName.replace(/\s+/g, '').toLowerCase()}.com?size=20`} onError={handleImageNotFound}
                        /> {companyName}
                    </Card.Title>
                    <Card.Text>
                        {/* {data.description} */}
                    </Card.Text>
                    <Button className="btn-light btn-outline-primary" onClick={() => setShow(true)}>See {data.postings.length} postings</Button>

                    <PostingsModal show={show} handleClose={handleClose} company={companyName} postings={data.postings} />


                </Card.Body>
            </Card>
        </div>



    )
}

export default CompanyCard;
