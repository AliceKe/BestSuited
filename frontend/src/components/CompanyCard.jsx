

const CompanyCard = ({ companyName, data }) => {
    return (
        <div className="card col-md-4">
            <img className="card-img-top" src={data.image} alt="Card image cap"></img>
            <div className="card-body">
                <h5 className="card-title">{companyName}</h5>
                <p className="card-text">{data.rating}</p>
            </div>
            <div className="card-body">
                <a href="#" className="card-link">Company Site</a>
                <a href="#" className="card-link">View {data.postings.size} Jobs</a>
            </div>
        </div>
    )
}

export default CompanyCard;