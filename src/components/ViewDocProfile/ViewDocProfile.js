
import { useEffect, useState } from "react";
import "./ViewDocProfile.css";
import axios from "axios";
import EndPoint from "../../apis/EndPoint";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function ViewDocProfile() {
  const [doctor, setDoctor] = useState({});
  const location = useLocation();
  const { doctorId } = location.state || {};
  const [post, setPost] = useState([]);
  const [active, setActive] = useState("certificate");
  const [showPostModal, setShowPostModal] = useState(false);
  const navigate = useNavigate();

  const loadDoctors = async () => {
    try {
      let response = await axios.get(
        `${EndPoint.doc_profile}/${doctorId}`,
        { withCredentials: true }
      );
      setDoctor(response.data.doctor || {});
    } catch (error) {
      console.log("Error fetching doctor:", error);
    }
  };

const loadPost = async () => {
  try {
    const response = await axios.get(
      `${EndPoint.fetchPost_Id}${doctorId}`, {withCredentials:true}
    );
    setPost(response.data.posts || []);
  } catch (error) {
    console.log("Post fetching error", error);
  }
};



  useEffect(() => {
    loadDoctors();
    loadPost();
  }, []);

  const chageTimeto12hour = (time) => {
    if (!time) return "";
    let [hours, minutes] = time.split(":").map(Number);
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      

      <div className="profile-container">
        <div className="left- mt-4">
          <div className="profile-pic">
            <img
              src={doctor?.profile?.imageName || "/assets/default.png"}
              alt="DoctorImage"
            />
          </div>
          <div className="Content-box">
            <h4 className="fw-bold">
              <strong>{doctor.name}</strong>
            </h4>
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
              <p>
                <strong>Bio:</strong> {doctor?.profile?.bio}
              </p>
            </div>
            <div>
              <p>
                <strong>Experience:</strong> {doctor?.doctorInfo?.experience}
              </p>
            </div>
            <div>
              <strong>Availability:</strong>
              <div style={{ marginLeft: "10px" }}>
                {doctor?.doctorInfo?.availability?.map((slot, idx) => (
                  <div key={idx}>
                    {slot.date
                      ? new Date(slot.date).toLocaleDateString()
                      : "No Date"}{" "}
                    - {chageTimeto12hour(slot.from)} to{" "}
                    {chageTimeto12hour(slot.to)}
                  </div>
                ))}
              </div>
            </div>
            <p>
              <strong>Address:</strong> {doctor?.profile?.address}
            </p>
          </section>

          {/* Certifications & Posts */}
          <section className="certifications p-4 m-0">
            <div className="d-flex row mb-3 position-relative">
              <button
                className={`col-md-6 border-0 py-2 ${
                  active === "certificate" ? "active-tab" : ""
                }`}
                onClick={() => setActive("certificate")}
              >
                Certificate
              </button>
              <button
                className={`col-md-6 border-0 py-2 ${
                  active === "post" ? "active-tab" : ""
                }`}
                onClick={() => setActive("post")}
              >
                Post
              </button>
              <div
                className="tab-indicator"
                style={{ left: active === "certificate" ? "0%" : "50%" }}
              />
            </div>

            {active === "certificate" && (
              <div>
                {doctor?.doctorInfo?.certificates?.length > 0 ? (
                  doctor.doctorInfo.certificates.map((certi, index) => (
                    <div key={index} className="container my-2">
                      <div className="px-3 p-1">
                        <p>{certi.name}</p>
                        <p>{certi.description}</p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(certi.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="certificate-img">
                        <img alt="Certificate" src={certi.certificate} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No certificates available</p>
                )}
              </div>
            )}

            {active === "post" && (
              <div>
                {/* Add Post Button */}
                {post.length > 0 ? (
                  post.map((p, idx) => (
                    <div key={idx} className="container my-2 post-card">
                      <div className="px-3 p-1">
                        <h5>{p.title}</h5>
                        <p>{p.content}</p>
                        {p.postImage && (
                          <img
                            src={p.postImage}
                            alt="Post"
                            className="post-media"
                          />
                        )}
                        {p.postVideo && (
                          <video
                            controls
                            className="post-media"
                            src={p.postVideo}
                          >
                            Your browser does not support the video tag.
                          </video>
                        )}
                        <p className="post-date">
                          <strong>Date:</strong>{" "}
                          {new Date(p.createDate).toLocaleDateString()}
                        </p>
                      
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No posts available</p>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Modal for Add Post */}
      {showPostModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowPostModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          > 
            <h3>Add Post</h3>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewDocProfile;
