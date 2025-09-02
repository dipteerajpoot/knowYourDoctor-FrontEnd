import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import EndPoint from "../../apis/EndPoint";
import Navbar from "../Navbar/Navbar";
import "./Find.css";
function Find() {
  console.log("we are in find")
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const searchTerm = location.state?.search?.trim() || "";
  console.log("searchTerms", searchTerm);

  const loadDoctors = async () => {
    try {
      setIsLoading(true)
      let response;
      if (searchTerm) {
        response = await axios.get(EndPoint.search_doc,{params: { term: searchTerm}, withCredentials: true });
      } else {
        response = await axios.get(EndPoint.doc_List,{withCredentials:true});
      }
      setDoctors(response.data.doctors || []);
      setIsLoading(false);
    } catch (error) {
       console.error("Error fetching doctors:", error);
    }
    finally {
       setIsLoading(false);
 }
  };

  useEffect(() => {
    loadDoctors();
  }, [searchTerm]);


  return <>
    <div><Navbar /></div>
    {isLoading ? <div className="spinner-border spinner-position " > </div> : ""}
    <div className="main-container mt-5 p-4 ">
      <div className="row">
        {doctors.length>0 ?(
        doctors.map((doctor, index) => (

          <div key={doctor._id} className="col-12 col-md-6 mb-2">
            <div className="doctor-card">
              <img
                src={doctor?.profile?.imageName || "/assets/default.png"}
                alt={doctor.name}
              />
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p>{doctor?.doctorInfo?.specialization}</p>
                <p>{doctor?.doctorInfo?.experience}</p>

                <div className="doctor-actions">
                  <Link to="/viewDocProfile" state={{ doctorId: doctor._id }} className="btn-view">View Profile</Link>
                  <Link to="/aptmt" state={{ doctorId: doctor._id, dname: doctor.name, specialization: doctor.doctorInfo.specialization, imageName: doctor?.profile?.imageName, availability: doctor.doctorInfo.availability }} className="btn-appointment">Take Appointment</Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ):( <p className="text-center mt-3">
              No doctors found for "{searchTerm}"
            </p>)}
      </div>
    </div>
  </>
}
export default Find;
