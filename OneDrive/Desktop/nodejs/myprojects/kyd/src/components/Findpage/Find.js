import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EndPoint from "../../apis/EndPoint";
import Navbar from "../Navbar/Navbar";
import { color } from "@mui/system";
import "./Find.css";
function Find() {
  console.log("we are in find")
  let [doctors, setDoctors] = useState([]);
  let loadDoctors = async () => {
    try {
      let response = await axios.get(EndPoint.doc_List);
      setDoctors(response.data.doctors || [])
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } 
  };
  useEffect(() => {
    loadDoctors();
  }, []);

  return <>
    <div><Navbar /></div>
    <div className="main-container m-0 p-4  ">
      <div className="row">
        {doctors.map((doctor, index) => (
          <div key={index} className="col-12 col-md-6 mb-2">
            <div className="doctor-card ">
              <img
                src={doctor.imageName ? doctor.imageName : "/assets/default.png"}
                alt={doctor.name}
              />
              <div className="doctor-info">
                <h3><b>{doctor.name}</b></h3>
                <p>{doctor.specialization}</p>
                <p>{doctor.experience}</p>

                <div className="doctor-actions">
                  <Link to="/ViewDocProfile" state={{doctorId:doctor._id}} className="btn-view">View Profile</Link>
                  <Link to="/aptmt" state={{ doctorId: doctor._id , dname:doctor.name,specialization:doctor.doctorInfo.specialization,imageName:doctor.imageName, availability: doctor.doctorInfo.availability}} className="btn-appointment">Take Appointment</Link>
                </div>
              </div>    
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
}
export default Find;
