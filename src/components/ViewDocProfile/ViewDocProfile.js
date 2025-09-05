import {useEffect, useState } from "react";
import "./ViewDocProfile.css";
import axios from "axios";
import EndPoint from "../../apis/EndPoint";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function ViewDocProfile() {
  const [doctor, setDoctor] = useState({});
  const location = useLocation();
  const { doctorId } = location.state || {};
  const loadDoctors = async () => {
    try {
      let response = await axios.get(`${EndPoint.doc_profile}/${doctorId}`, { withCredentials: true });
      setDoctor(response.data.doctor || {});
    } catch (error) {
      console.log("Error fetching doctor:", error);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);
  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="left- mt-4">
          <div className="profile-pic">
            <img src={doctor?.profile?.imageName || "/assets/default.png"} alt="DoctorImage" />
          </div>

          <div className="Content-box">
            <h4 className="fw-bold"><strong>{doctor.name}</strong></h4>
            <h5>{doctor?.doctorInfo?.specialization}</h5>
            <h6>{doctor?.profile?.address}</h6>
          </div>
        </div>

        <div className="rigth-container mt-5 pt-2">
          {/* About Doctor Section */}
          <section className="about-Doctor">
            <h1>{doctor.name}</h1>
            <div className="specialist">
              <p>Specialization: {doctor?.doctorInfo?.specialization}</p>
            </div>
            <div>
              <p>{doctor?.doctorInfo?.education}</p>
            </div>
            <div className="bio">
              <p><strong>Bio:</strong> {doctor?.profile?.bio}</p>
            </div>
            <div><p><strong>Experience:</strong> {doctor?.doctorInfo?.experience}</p></div>
            <div><p><strong>Availability:</strong> {doctor?.availability}</p></div>
            <p><strong>Address:</strong> {doctor?.profile?.address}</p>
          </section>

          {/* Certifications Section */}
          <section className="certifications p-4 m-0">
            <div className="mt-2">
              <h2>Certifications</h2>
              <hr />
            </div>
            {doctor?.doctorInfo?.certificates?.length > 0 ? (
              doctor.doctorInfo.certificates.map((certi, index) => (
                <div key={index} className="container my-2">
                  <div className="px-3 p-1">
                    <p>{certi.name}</p>
                    <p>{certi.description}</p>
                    <p><strong>Date:</strong> {certi.date}</p>
                  </div>
                  <div className="certificate-img">
                    <img alt="Certificate of Appreciation" src={certi.certificate} />
                  </div>
                </div>
              ))
            ) : (
              <p>No Certificates Available</p>
            )}
          </section>
        </div>
      </div> 
    </>
  );
}

export default ViewDocProfile;
