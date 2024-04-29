import { useEffect, useState } from "react";

import "./App.css";
import { companiesSortBy, groupPostingsByCompany } from "./static/script";
import Playground from "./pages/Playground";
import Welcome from "./pages/Welcome";

import SoftwareEngineer from "./images/softwareEngineer.jpeg";
import Professor from "./images/professor.jpeg";
import Instrumentalist from "./images/instrumentalist.jpeg";
import GymTrainer from "./images/gymTrainer.jpeg";
import MechanicalEngineer from "./images/mechanicalEngineer.jpeg";
import Politician from "./images/politician.jpeg";
import Accountant from "./images/accountant.jpeg";
import Doctor from "./images/doctor.jpeg";
import Judge from "./images/judge.jpeg";
import Preacher from "./images/preacher.jpeg";

const sortParams = {
  Companies: ["Rating", "Name"],
  "Job Postings": ["Rank", "Role"],
};

function App() {
  const [welcome, setWelcome] = useState(true);
  const [postings, setPostings] = useState([]);
  const [companiesPostings, setCompaniesPostings] = useState([]);

  const [groupBy, setGroupBy] = useState("Companies");
  const [sortBy, setSortBy] = useState(sortParams.Companies[0]);

  useEffect(() => {
    setTimeout(() => {
      setWelcome(false);
    }, 2000);
  }, []);

  const handlePostingsUpdate = (data) => {
    setPostings(data);
    setCompaniesPostings(groupPostingsByCompany(data));
  };

  const handleSorting = (val) => {
    if (["Rating", "Name"].indexOf(val) !== -1) {
      let tmp = companiesSortBy(companiesPostings, val);
      setCompaniesPostings(tmp);
    }
    setSortBy(val);
  };

  const updateFilteredPostings = (filteredData) => {
    setPostings(filteredData);
    setCompaniesPostings(groupPostingsByCompany(filteredData));
  };

  return (
    <div className="h-100 overflow-hidden">
      <div class="d-flex z-n1 position-absolute position-fixed h-100 w-100 row mb-3">
        <div class="col d-flex align-items-start px-3 flex-column">
          <img
            src={Accountant}
            alt=""
            className="img-fluid d-none d-lg-block  border border-5 border-light rounded-circle job-image"
          />
          <img
            src={Doctor}
            alt=""
            className="img-fluid d-none d-lg-block  pl-3 border border-5 border-light rounded-circle job-image"
            style={{ marginLeft: "8%", marginTop: "7%" }}
          />

          <div className="d-flex">
            <img
              src={Professor}
              alt=""
              className="img-fluid d-none d-lg-block  border border-5 border-light rounded-circle job-image"
              style={{ marginTop: "10%" }}
            />
            {/* <img src={Instrumentalist} alt="" className="img-fluid d-none d-xxl-block  border border-5 border-light rounded-circle job-image" style={{ "marginTop": "10%", "marginLeft": "30%" }} /> */}
            <img
              src={Instrumentalist}
              alt=""
              className="img-fluid d-none d-lg-block  border border-5 border-light rounded-circle job-image"
              style={{ marginTop: "25%", marginLeft: "15%" }}
            />
          </div>
        </div>

        <div class="col d-flex align-items-end px-3 flex-column mb-3">
          <img
            src={SoftwareEngineer}
            alt=""
            className="img-fluid d-none d-lg-block  border border-5 border-light rounded-circle job-image"
          />
          <img
            src={MechanicalEngineer}
            alt=""
            className="img-fluid d-none d-lg-block  pl-3 border border-5 border-light rounded-circle job-image"
            style={{ marginTop: "10%" }}
          />
          <div className="d-flex" style={{ marginTop: "7%" }}>
            <img
              src={GymTrainer}
              alt=""
              className="img-fluid d-none d-lg-block  border border-5 border-light rounded-circle job-image"
              style={{ marginTop: "-15%", margin: "-25%" }}
            />
            <img
              src={Politician}
              alt=""
              className="img-fluid d-none d-lg-block  border border-5 border-light rounded-circle job-image"
              style={{ marginTop: "5%", marginRight: "10%" }}
            />
            {/* <img src={Politician} alt="" className="img-fluid d-none d-lg-block  border border-5 border-light rounded-circle job-image" style={{ "marginTop": "1%", "marginRight": "10%" }} /> */}
          </div>
        </div>
      </div>

      <div className="z-3 mx-auto mt-3 d-flex w-100 flex-column align-items-center">
        {
          // welcome ?
          //   <Welcome />
          //   :
          <Playground />
        }
      </div>
      <div className="bottom-0 pt-n3 pb-n3 bg-light d-flex position-fixed w-20">
        <p className="pt-n3">
          {" "}
          <a href="https://github.com/AliceKe/BestSuited">Built</a> with ❤️ by
          C.A.B.A.O.
        </p>
      </div>
    </div>
  );
}

export default App;
