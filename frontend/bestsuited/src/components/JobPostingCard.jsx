const JobPostingCard = ({ posting }) => {

    return (
        <div className="card col-md-4 border-primary mb-3 ml-3 mt-3">
            <div className="card-header">{posting.role}</div>
            <div className="card-body text-primary">
                <h5 className="card-title">Primary card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    )
}


export default JobPostingCard;