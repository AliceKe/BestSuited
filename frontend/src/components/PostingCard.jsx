import { useState } from "react";
import defaultImage from '../images/favicon.png';
import PostingsModal from "./PostingsModal";
import { Button, Card } from 'react-bootstrap/';
import CompanyRating from "./Rating";


const PostingCard = ({ posting }) => {
    const [image, setImage] = useState("")
    const [imageNotFound, setImageNotFound] = useState(false);

    const handleImageNotFound = () => {
        if (!imageNotFound) {
            setImageNotFound(true);
            setImage(defaultImage);
        }
    }



    return (

        <div className="col-md-3 col-sm-6 px-3 my-3 hover-zoom">

            <Card className="bg-light w-90 px-0 py-0">

                <Card.Body>
                    <Card.Title className="flex" >
                        <img src={image || `https://logo.clearbit.com/${posting.company.replace(/\s+/g, '').toLowerCase()}.com?size=20`} onError={handleImageNotFound}
                            alt="" /> {posting.role}
                    </Card.Title>
                    <Card.Text>
                        {/* {data.description} */}
                    </Card.Text>

                    <div className="d-flex align-items-center justify-content-between">
                        <p>
                            {posting["salary range"]}
                        </p>
                        <p>
                            {posting.city}, {posting.country}
                        </p>

                        {/* <Button className="btn-light btn-outline-primary" onClick={() => setShow(true)}>Apply here!</Button> */}
                    </div>

                </Card.Body>
            </Card>
        </div>



    )
}

export default PostingCard;
