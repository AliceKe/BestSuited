const CompanyCard = ({company}) => {
    return (
        <div className="card">
            <img className="card-img-top" src="..." alt="Card image cap"></img>
            <div className="card-body">
                <h5 className="card-title">{company}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div className="card-body">
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>
        </div>
    )
}

export default CompanyCard;