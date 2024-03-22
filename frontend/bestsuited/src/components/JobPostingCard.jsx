const JobPostingCard = ({ posting }) => {

    return (
        <div className="card">
            <h5 className="card-header">{posting.role}</h5>
            <div className="card-body">
                <h5 className="card-title">{posting.city}, {posting.country}</h5>
                <p className="card-text">{posting.description}</p>
                <a href="#" className="btn btn-primary">Link to apply</a>
            </div>
        <h5 className="card-header">{posting.role}</h5>
        <div className="card-body">
        <h5 className="card-title">{posting.city}, {posting.country}</h5>
        <p className="card-text">Company Rating: {posting.rating}</p>
        <a href="#" className="btn btn-primary">Link to apply</a>
        </div>
        </div>

        
    )
}


export default JobPostingCard;