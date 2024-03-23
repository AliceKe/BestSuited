import { useState } from "react";
import defaultImage from '../images/favicon.png'; 
import PostingsModal from "./PostingsModal";


const CompanyCard = ({ companyName, data }) => {
    const [image, setImage] = useState("")
    const [imageNotFound, setImageNotFound] = useState(false);

    const handleImageNotFound = () => {
        if (!imageNotFound) { 
            setImageNotFound(true); 
            setImage(defaultImage);
        }
    }

    const [showPostings, setShowPostings] = useState(false);
    // console.log(data)

    return (
        <div className="card col-md-4">
            <img className="card-img-top" src={image || `https://logo.clearbit.com/${companyName.replace(/\s+/g, '').toLowerCase()}.com?size=200`}
                alt = "Company Logo not found"
                onError= {handleImageNotFound}
            ></img>
                
            <div className="card-body">
                <h5 className="card-title">{companyName}</h5>
                <p className="card-text">{data.rating}</p>
            </div>
            <div className="card-body">
                <a href="#" className="card-link">Company Site</a>
                <button onClick={setShowPostings}>View {data.postings.size} Jobs</button>
            </div>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                View all {data.postings.length} postings
            </button>
            <PostingsModal postings={data.postings} />
        </div>

    )
}

export default CompanyCard;
