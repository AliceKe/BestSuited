const CompanyCard = ({companyInfo}) => {
    return (
        <div className="card col-md-4">
            <img className="card-img-top" src={companyInfo.image} alt="Card image cap"></img>
            <div className="card-body">
                <h5 className="card-title">{companyInfo.company}</h5>
                <p className="card-text">{companyInfo.rating}</p>
            </div>
            <div className="card-body">
                <a href="#" className="card-link">Company Site</a>
                <a href="#" className="card-link">View {companyInfo.postings.length} Jobs</a>
            </div>
        </div>
    )
}

export default CompanyCard;