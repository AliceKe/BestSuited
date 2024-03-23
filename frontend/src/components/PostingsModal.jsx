const PostingsModal = ({ postings }) => {
    console.log({postings})
    return (

        <div className="modal fade modal-xl" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">



                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Rank</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Salary</th>
                                    <th scope="col">Skills</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postings.map((posting) => <tr>
                                    <th scope="row">1</th>
                                    <td>{posting.role}</td>
                                    <td>{posting.city}, {posting.country}</td>
                                    <td>{posting['salary range']}</td>
                                    <td>{posting.skills}</td>
                                </tr>)}
                            </tbody>
                        </table>


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default PostingsModal;