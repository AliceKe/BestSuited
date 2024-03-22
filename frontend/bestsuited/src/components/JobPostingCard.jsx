const JobPostingCard = (posting) => {

    return (
        <div className="card">
        <h5 className="card-header">Company</h5>
        <div className="card-body">
        <h5 className="card-title">Role</h5>
        <p className="card-text">Location</p>
        <a href="#" className="btn btn-primary">Link to apply</a>
        </div>
        </div>
    )
}


export default JobPostingCard;