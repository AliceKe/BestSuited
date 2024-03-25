const SortByDropDown = ({ params }) => {
    return (
        <div className="dropdown">

            <button className="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort By
            </button>

            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button className="dropdown-item" type="button">Action</button>
                <button className="dropdown-item" type="button">Another action</button>
                <button className="dropdown-item" type="button">Something else here</button>
            </div>
        </div>
    )
}

export default SortByDropDown;