const CompanyCard = ({company}) => {
    return (
        <div className="card col-md-4">
            <img className="card-img-top" src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png" alt="Card image cap"></img>
            <div className="card-body">
                <h5 className="card-title">Company{company}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div className="card-body">
                <a href="#" className="card-link">Company Site</a>
                <a href="#" className="card-link">View All Jobs</a>
            </div>
        </div>
    )
}

export default CompanyCard;