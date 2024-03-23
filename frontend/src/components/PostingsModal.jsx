const PostingsModal = ({ postings }) => {

    return (

        <div class="modal fade modal-xl" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">



                        <table class="table">
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
                                    <td>{posting.salary}</td>
                                    <td>{posting.skills}</td>
                                </tr>)}
                            </tbody>
                        </table>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default PostingsModal;