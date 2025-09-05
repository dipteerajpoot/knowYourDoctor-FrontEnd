import { useEffect, useState } from "react";
import "./DocManage.css";
import axios from "axios";
import EndPoint from "../../apis/EndPoint";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";

function ViewDocProfile() {
    const [doctor, setDoctor] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setshowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: doctor?.name,
        specialization: doctor?.doctorInfo?.specialization,
        bio: doctor?.profile?.bio,
        experience: doctor?.doctorInfo?.experience,
        availability: doctor?.availability,
        address: doctor?.profile?.address,
    });
    const [active, setActive] = useState("certificate")
    const [post, setPost] = useState([])

    const loadPost = async () => {
        try {
            const response = await axios.get(`${EndPoint.fetch_post}`, { withCredentials: true })
            setPost(response.data.posts || [])
        } catch (error) {
            console.log("Post fetching error", error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await axios.patch(`${EndPoint.doc_profileUpdate}`, formData, {
                withCredentials: true,
            });
            setIsEditing(false);
            loadDoctors();
        } catch (error) {
            console.log("Error updating profile", error);
        }
        finally {
            setIsLoading(false);
        }
    };


    let loadDoctors = async () => {
        try {
            let response = await axios.get(`${EndPoint.get_profile}`, { withCredentials: true });
            console.log("doctor ka data ", response.data)
            setDoctor(response.data.doctor || {});
        } catch (error) {
            console.log("Error in fatching doctors :", error)
        }
    }
    useEffect(() => {
        loadDoctors();
        loadPost();
    }, []);

    const handleProfileUpdate = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("imageName", file)
        try {
            setIsLoading(true);
            const response = await axios.patch(`${EndPoint.doc_profileUpdate}`, formData, { withCredentials: true });

            setDoctor(response.data.doctor);
            await loadDoctors();
            setshowForm(false)
            toast.success("Profile updated successfully");

        } catch (error) {
            console.log("Error updating profile image:", error);
            toast.error("profile updation failed")
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleProfileDelete = async (e) => {
        try {
            const con = window.confirm("Are you sure you want to delete profile photo?");
            if (!con) { return }
            const responseimg = await fetch("/assets/default.png");
            const blob = await responseimg.blob();
            // Create a File object from Blob
            const file = new File([blob], "default.png", { type: blob.type });
            const formData = new FormData();
            formData.append("imageName", file)
            const response = await axios.patch(`${EndPoint.doc_profileUpdate}`, formData, { withCredentials: true });
            setDoctor(response.data.doctor);
            await loadDoctors();
            setshowForm(false)
            toast.success("Profile deleted successfully");

        } catch (error) {
            console.log("error in deleting profile", error);
            toast.error("Profile not deleted");
        }
    }

    return (
        <>
            <ToastContainer />
            <div><Navbar /></div>

            {isLoading ? <div className="spinner-border spinner-overlay"></div> : ""}

            <div className="profile-container mt-5">
                {/* //leftside section */}
                <div className="left- d-flex">
                    <div className="profile-pic" onClick={() => { setshowForm(true) }}>
                        <div className="profile-pic" onClick={() => { setshowForm(true) }}>
                            <img
                                src={
                                    doctor?.profile?.imageName && doctor.profile.imageName.trim() !== ""
                                        ? doctor.profile.imageName
                                        : "./assets/default.png"
                                }
                                alt="Doctor"
                            />
                        </div>
                    </div>
                    <div className="Content-box " >
                        <h4 className="fw-bold"><b>{doctor.name}</b></h4>
                        <h5>{doctor?.doctorInfo?.specialization}</h5>
                        <h6>{doctor?.profile?.address}</h6>
                    </div>
                </div>

                <div className="rigth-container  pt-2">
                    {/* //right avobe section */}
                    <section className="about-Doctor">
                        {isEditing ? (<section className="edit-doctor-form">

                            <form onSubmit={handleSubmit}>
                                <div className="mb-2">
                                    <label>Name</label><br />
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={doctor.name} style={{ width: "300px" }} />
                                </div>
                                <div className="mb-2">
                                    <label>Specialization</label><br />
                                    <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} placeholder={doctor?.doctorInfo?.specialization} style={{ width: "300px" }} />
                                </div>
                                <div className="mb-2">
                                    <label>Bio</label><br />
                                    <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder={doctor?.profile?.bio} style={{ width: "300px" }} />
                                </div>
                                <div className="mb-2">
                                    <label>Experience</label><br />
                                    <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder={doctor?.doctorInfo?.experience} style={{ width: "300px" }} />
                                </div>
                                <div className="mb-2">
                                    <label>Availability</label><br />
                                    <input type="text" name="availability" value={formData.availability} onChange={handleChange} placeholder={doctor?.availability} style={{ width: "300px" }} />
                                </div>
                                <div className="mb-2">
                                    <label>Address</label><br />
                                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder={doctor?.profile?.address} style={{ width: "300px" }} />
                                </div>
                                <button type="submit" className="btn btn-success mt-2" >Save</button>
                            </form>
                        </section>) : (<div className="doc-data">
                            <h1><b>{doctor.name}</b></h1>
                            <div className="specialist">
                                <p>Specialization : {doctor?.doctorInfo?.specialization}</p>
                            </div>
                            <div className="bio"><p><strong>Bio : </strong>{doctor?.profile?.bio}</p>
                            </div>
                            <div><p><strong>Experience : </strong>{doctor?.doctorInfo?.experience}</p></div>
                            <div><p><strong>Availability : </strong>{doctor?.availability}</p></div>
                            <p><strong>Address : </strong>{doctor?.profile?.address}</p>
                            <button
                                style={{ marginLeft: "80%", backgroundColor: "#1B3B7D", color: "white" }}
                                className="btn"
                                onClick={() => setIsEditing(true)}>
                                Edit Profile
                            </button>
                        </div>
                        )}
                    </section>

                    {/* right below section */}
                    <section className="certifications p-4 m-0 ">
                        <div className="d-flex row mb-3 position-relative">
                            <button className={`col-md-6 border-0 py-2 ${active === "certificate" ? "active-tab" : ""}`} onClick={() => setActive("certificate")}>Certificate</button>
                            <button className={`col-md-6 border-0 py-2 ${active === "post" ? "active-tab" : ""}`} onClick={() => setActive("post")}>Post</button>
                            {/* Indicator */}
                            <div className="tab-indicator" style={{ left: active === "certificate" ? "0%" : "50%", }} />
                        </div>
                        {active === "certificate" && (
                            <div>
                                {doctor?.doctorInfo?.certificates?.length > 0 ? (
                                    doctor.doctorInfo.certificates.map((certi, index) => (
                                        <div key={index} className="container  my-2">
                                            <div className="px-3 p-1"><p><strong></strong> {certi.name}</p>
                                                <p><strong></strong> {certi.description}</p>
                                                <p><strong>Date:</strong> {certi.date}</p>
                                            </div>
                                            <div className="certificate-img">
                                                <img alt="Certificate of Appreciation" src={certi.certificate} />
                                            </div>
                                        </div>
                                    )
                                    )) : (<p>"No any Certificate Available"</p>)}
                            </div>
                        )}
                        {active === "post" && (
                            <div>
                                {post.length > 0 ? (
                                    post.map((post, idx) => (
                                        <div key={idx} className="container my-2 post-card">
                                            <div className="px-3 p-1">
                                                <h5>{post.title}</h5>
                                                <p>{post.content}</p>
                                                {post.postImage && (
                                                    <div>
                                                        <img src={post.postImage} alt="Post Image" className="post-media" />
                                                    </div>
                                                )}
                                                {post.postVideo && (
                                                    <div>
                                                        <video controls className="post-media" src={post.postVideo}>
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </div>
                                                )}
                                                
                                                <p className="post-date">
                                                    <strong>Date:</strong>{" "}{new Date(post.createDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No Posts Available</p>
                                )}
                            </div>
                        )}

                    </section>
                </div>
            </div>

            {
                showForm && (
                    <div className="modal-overlay" onClick={() => setshowForm(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>Profile Image </h3>
                            <div className="modal-buttons">
                                <button onClick={handleProfileDelete} className="delete-btn">Delete Profile</button>
                                <label htmlFor="update-profile" className="update-btn">Update Profile</label>
                                <input type="file" id="update-profile" style={{ display: "none" }} onChange={handleProfileUpdate}
                                />
                            </div>
                            <button className="close-btn" onClick={() => setshowForm(false)}>Close</button>
                        </div>
                    </div>
                )
            }

        </>
    )
}
export default ViewDocProfile;

