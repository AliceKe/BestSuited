import { Modal } from "react-bootstrap";
import ExpandedJobCard from "./ExpandedJobCard";

const JobModal = ({ show, handleClose, posting }) => {
  //   return (
  //     <Modal show={show} onHide={handleClose} size="xl">
  //       <Modal.Header closeButton>
  //         <Modal.Title>{posting.role}</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         {/* <table className="table">
  //           <thead>
  //             <tr>
  //               <th className="text-primary bold" scope="col">
  //                 Company
  //               </th>
  //               <th className="text-dark bold" scope="col">
  //                 Location
  //               </th>
  //               <th className="text-primary bold" scope="col">
  //                 Salary
  //               </th>
  //               <th className="text-black bold" scope="col">
  //                 Skills
  //               </th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             <tr>
  //               <td className="text-dark">{posting.company}</td>
  //               <td>
  //                 {posting.city}, {posting.country}
  //               </td>
  //               <td className="text-primary">{posting["salary range"]}</td>
  //               <td>{posting.skills}</td>
  //             </tr>
  //           </tbody>
  //         </table> */}
  //       </Modal.Body>
  //     </Modal>
  //   );
  // };
  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>{posting.role}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>
            <strong>Company:</strong> {posting.company}
          </p>
          <p>
            <strong>Location:</strong> {posting.city}, {posting.country}
          </p>
          <p>
            <strong>Salary:</strong> {posting["salary range"]}
          </p>
          <p>
            <strong>Skills:</strong> {posting.skills}
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default JobModal;
