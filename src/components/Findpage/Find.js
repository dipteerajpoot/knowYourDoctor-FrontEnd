import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import EndPoint from "../../apis/EndPoint";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";
import "./Find.css";
import { ToastContainer,toast } from "react-toastify";

function Find() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const searchTerm = location.state?.search?.trim() || "";

  const loadDoctors = async () => {
    try {
      setIsLoading(true);
      let response;
      if (searchTerm) {
        response = await axios.get(EndPoint.search_doc, { 
          params: { term: searchTerm }, 
          withCredentials: true 
        });
      } else {
        response = await axios.get(EndPoint.doc_List, { withCredentials:true });
      }
      setDoctors(response.data.doctors || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadDoctors(); }, [searchTerm]);

  return (
    <>
      <Navbar />
      <ToastContainer/>
      {isLoading && <div className="spinner-border spinner-position"></div>}

      <div className="container mt-5 pt-4">
        <div className="main-container">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div key={doctor._id} className="doctor-card">
                <img 
                  src={doctor?.profile?.imageName || "/assets/default.png"} 
                  alt={doctor.name} 
                />
                <h2><strong>{doctor.name}</strong></h2>
                <p>Specialization - {doctor?.doctorInfo?.specialization}</p>
                <p>Experience - {doctor?.doctorInfo?.experience}</p>
                <p>Bio - {doctor?.profile?.bio}</p>
                <p>Address - {doctor?.profile?.address}</p>
                <div className="doctor-actions">
                  <Link to="/viewDocProfile" state={{ doctorId: doctor._id }} className="btn-view">
                    View Profile
                  </Link>
                  <Link to="/aptmt" state={{
                    doctorId: doctor._id,
                    dname: doctor.name,
                    specialization: doctor.doctorInfo.specialization,
                    imageName: doctor?.profile?.imageName,
                    availability: doctor.doctorInfo.availability
                  }} className="btn-appointment">
                    Take Appointment
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-3">No doctors found for "{searchTerm}"</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Find;
