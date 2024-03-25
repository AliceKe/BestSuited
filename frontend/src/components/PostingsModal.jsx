import { Modal } from 'react-bootstrap';

const PostingsModal = ({ show, handleClose, company, postings }) => {

    return (
        <Modal show={show} onHide={handleClose} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>Job Postings by {company}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table">
                    <thead>
                        <tr>
                            <th className='text-primary bold' scope="col">Rank</th>
                            <th className='text-black bold' scope="col">Role</th>
                            <th className='text-dark bold' scope="col">Location</th>
                            <th className='text-primary bold' scope="col">Salary</th>
                            <th className='text-black bold' scope="col">Skills</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postings.map((posting, index) => <tr key={posting.id}>
                            <th className='text-primary' scope="row">{index + 1}</th>
                            <td className='text-dark'>{posting.role}</td>
                            <td>{posting.city}, {posting.country}</td>
                            <td className='text-primary'>{posting["salary range"]}</td>
                            <td>{posting.skills}</td>
                        </tr>)}
                    </tbody>
                </table>



            </Modal.Body>
        </Modal>



    )
}


export default PostingsModal;
