import { Modal } from "react-bootstrap";

const PostingsModal = ({ show, handleClose, role, data }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>{role}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th className="text-primary bold" scope="col">
                Rank
              </th>
              <th className="text-black bold" scope="col">
                Role
              </th>
              <th className="text-dark bold" scope="col">
                Location
              </th>
              <th className="text-primary bold" scope="col">
                Salary
              </th>
              <th className="text-black bold" scope="col">
                Skills
              </th>
            </tr>
          </thead>
          <tbody>
            <th className="text-primary" scope="row"></th>
            <td className="text-dark"></td>
            <td></td>
            <td className="text-primary"></td>
            <td></td>
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

export default PostingsModal;
