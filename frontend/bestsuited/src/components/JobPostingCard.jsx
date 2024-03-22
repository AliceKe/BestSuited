const JobPostingCard = ({ posting }) => {

    return (
        <div className="col-md-4">
            <div className="card mt-1">
                <h5 className="card-header">{posting.role}</h5>
                <div className="card-body">
                    <h5 className="card-title">{posting.city}, {posting.country}</h5>
                    <p class="text-truncate">{posting.description}</p>
                    <a href="#" className="btn btn-outline-primary rounded-pill">Link to apply</a>
                </div>
            </div>
        </div>

    )
}


export default JobPostingCard;