import { Modal } from 'react-bootstrap';

const PostingsModal = ({ show, handleClose, company, postings }) => {

    return (
        <Modal show={show} onHide={handleClose} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>Job Postings by {company}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                        {postings.map((posting, index) => <tr key={posting.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{posting.role}</td>
                            <td>{posting.city}, {posting.country}</td>
                            <td>{posting.salary}</td>
                            <td>{posting.skills}</td>
                        </tr>)}
                    </tbody>
                </table>



            </Modal.Body>
        </Modal>



    )
}


export default PostingsModal;
