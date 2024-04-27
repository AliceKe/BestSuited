import { useState } from "react";

import BarIcon from "../images/barIcon.jpeg"
import FileIcon from "../images/fileIcon.png"
import FormIcon from "../images/formIcon.jpeg"
import Accountant from "../images/accountant.jpeg"
import Doctor from "../images/doctor.jpeg"
import Judge from "../images/judge.jpeg"
import Preacher from "../images/preacher.jpeg"
import SoftwareEngineer from "../images/softwareEngineer.jpeg"
import Professor from "../images/professor.jpeg"
import Instrumentalist from "../images/instrumentalist.jpeg"
import GymTrainer from "../images/gymTrainer.jpeg"
import MechanicalEngineer from "../images/mechanicalEngineer.jpeg"
import Politician from "../images/politician.jpeg"




const Landing = () => {
    const [inputType, setInputType] = useState("")

    return (
        <div className="h-100 overflow-hidden">
            <div class="d-flex z-n1 position-absolute h-100 w-100 row mb-3">
                <div class="col d-flex align-items-start px-3 flex-column">
                    <img src={Accountant} alt="" className="img-fluid d-none d-lg-block  border border-5 border-light rounded-circle job-image" />
                    <img src={Doctor} alt="" className="img-fluid d-none d-lg-block  pl-3 border border-5 border-light rounded-circle job-image" style={{ "marginLeft": "8%", "marginTop": "7%" }} />

                    <div className="d-flex">
                        <img src={Professor} alt="" className="img-fluid d-none d-lg-block  border border-5 border-light rounded-circle job-image" style={{ "marginTop": "10%" }} />
                        {/* <img src={Instrumentalist} alt="" className="img-fluid d-none d-xxl-block  border border-5 border-light rounded-circle job-image" style={{ "marginTop": "10%", "marginLeft": "30%" }} /> */}
                        <img src={Instrumentalist} alt="" className="img-fluid d-none d-lg-block  border border-5 border-light rounded-circle job-image" style={{ "marginTop": "10%", "marginLeft": "30%" }} />
                    </div>
                </div>

                <div class="col d-flex align-items-end px-3 flex-column mb-3">
                    <img src={SoftwareEngineer} alt="" className="img-fluid d-none d-lg-block  border border-5 border-light rounded-circle job-image" />
                    <img src={MechanicalEngineer} alt="" className="img-fluid d-none d-lg-block  pl-3 border border-5 border-light rounded-circle job-image" style={{ "marginTop": "15%", }} />
                    <div className="d-flex">
                        <img src={GymTrainer} alt="" className="img-fluid d-none d-lg-block  border border-5 border-light rounded-circle job-image" style={{ "marginTop": "-15%", "margin": "-25%" }} />
                        <img src={SoftwareEngineer} alt="" className="img-fluid d-none d-lg-block  border border-5 border-light rounded-circle job-image" style={{ "marginTop": "5%", "marginRight": "10%" }} />
                        <img src={Politician} alt="" className="img-fluid d-none d-lg-block  border border-5 border-light rounded-circle job-image" style={{ "marginTop": "1%", "marginRight": "10%" }} />

                    </div>
                </div>
            </div>



            <div className="z-3 w-75 mx-auto mt-3 d-flex flex-column align-items-center">
                <div className="jumbotron w-100 pt-12 rounded-3">
                    <h1 className="display-2 text-dark text-center py-auto pt-3 poppins-font">
                        BestSuited
                    </h1>
                    <h3 className="display-8 text-center poppins-font">
                        Jobs Tailored for You
                    </h3>
                </div>

                <div className="row justify-content-center mb-5 w-75 mx-auto">
                    <p className="text-center mb-3">Choose your Input Type</p>
                    <div className="d-flex ">
                        <div className="col-md-4 d-flex flex-column text-center px-3">
                            <span>Resume Upload</span>
                            <button className="btn  btn-lg mb-2">
                                <img src={FileIcon} alt="" className="img-fluid icon-image" />
                            </button>
                        </div>
                        <div className="col-md-4 d-flex flex-column text-center px-3">
                            <span>Search Bar</span>
                            <button className="btn  btn-lg mb-2">
                                <img src={BarIcon} alt="" className="img-fluid icon-image" />
                            </button>
                        </div>

                        <div className="col-md-4 d-flex flex-column text-center px-3">
                            <span>Expanded Form Search</span>
                            <button className="btn  btn-lg mb-2">
                                <img src={FormIcon} alt="" className="img-fluid icon-image" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Landing;