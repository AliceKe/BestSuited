const JobPostingCard = ({ posting }) => {

    return (
        <div class="card col-md4" >
            <div class="card-body">
                <h5 class="card-title">{posting.role}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{posting.city}, {posting.country}</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
        </div>

    )
}


export default JobPostingCard;