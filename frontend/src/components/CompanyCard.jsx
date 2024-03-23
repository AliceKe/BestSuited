import { useState } from "react";
import PostingsModal from "./PostingsModal";


const CompanyCard = ({ companyName, data }) => {
    const [showPostings, setShowPostings] = useState(false);

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

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                View all {data.postings.length} postings
            </button>

            <PostingsModal postings={data.postings} />
        </div>
    )
}

export default CompanyCard;