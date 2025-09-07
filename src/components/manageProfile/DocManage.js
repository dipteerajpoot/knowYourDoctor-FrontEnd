import { useEffect, useState } from "react";
import "./DocManage.css";
import axios from "axios";
import EndPoint from "../../apis/EndPoint";
import Navbar from "../Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";

function ViewDocProfile() {
    const [doctor, setDoctor] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setshowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        specialization: "",
        bio: "",
        experience: "",
        availability: [{ from: "00:00", to: "00:00" }],
        address: "",
    });
    const [active, setActive] = useState("certificate");
    const [post, setPost] = useState([]);
    //cancel button 
    const resetForm = () => {
        setFormData({
            name: doctor?.name || "",
            specialization: doctor?.doctorInfo?.specialization || "",
            bio: doctor?.profile?.bio || "",
            experience: doctor?.doctorInfo?.experience || "",
            availability:
                doctor?.doctorInfo?.availability?.length > 0
                    ? doctor.doctorInfo.availability
                    : [{ from: "00:00", to: "00:00" }],
            address: doctor?.profile?.address || "",
        });
        setIsEditing(false);
    };

    const addAvailabilitySlot = () => {
        setFormData({
            ...formData,
            availability: [...formData.availability, { from: "00:00", to: "00:00" }]
        });
    };
    const removeAvailabilitySlot = (idx) => {
        const newSlots = [...formData.availability];
        newSlots.splice(idx, 1);
        setFormData({ ...formData, availability: newSlots });
    };


    // Update formData when doctor loads
    useEffect(() => {
        if (doctor && doctor.name) {
            setFormData({
                name: doctor?.name || "",
                specialization: doctor?.doctorInfo?.specialization || "",
                bio: doctor?.profile?.bio || "",
                experience: doctor?.doctorInfo?.experience || "",
                availability:
                    doctor?.doctorInfo?.availability?.length > 0
                        ? doctor.doctorInfo.availability
                        : [{ from: "00:00", to: "00:00" }],
                address: doctor?.profile?.address || "",
            });
        }
    }, [doctor]);

    const handleAvailability = (e, idx) => {
        const { name, value } = e.target;
        const newSlots = [...formData.availability];
        newSlots[idx][name] = value;
        setFormData({ ...formData, availability: newSlots });
    };

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
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error updating profile", error);
            toast.error("Profile update failed");
        } finally {
            setIsLoading(false);
        }
    };

    const loadDoctors = async () => {
        try {
            let response = await axios.get(`${EndPoint.get_profile}`, { withCredentials: true });
            setDoctor(response.data.doctor || {});
        } catch (error) {
            console.log("Error in fetching doctor:", error);
        }
    };

    const loadPost = async () => {
        try {
            const response = await axios.get(`${EndPoint.fetch_post}`, { withCredentials: true });
            setPost(response.data.posts || []);
        } catch (error) {
            console.log("Post fetching error", error);
        }
    };

    useEffect(() => {
        loadDoctors();
        loadPost();
    }, []);

    const handleProfileUpdate = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("imageName", file);
        try {
            setIsLoading(true);
            const response = await axios.patch(`${EndPoint.doc_profileUpdate}`, formData, { withCredentials: true });
            setDoctor(response.data.doctor);
            await loadDoctors();
            setshowForm(false);
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error updating profile image:", error);
            toast.error("Profile update failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleProfileDelete = async () => {
        try {
            const con = window.confirm("Are you sure you want to delete profile photo?");
            if (!con) return;

            const responseimg = await fetch("/assets/default.png");
            const blob = await responseimg.blob();
            const file = new File([blob], "default.png", { type: blob.type });
            const formData = new FormData();
            formData.append("imageName", file);

            const response = await axios.patch(`${EndPoint.doc_profileUpdate}`, formData, { withCredentials: true });
            setDoctor(response.data.doctor);
            await loadDoctors();
            setshowForm(false);
            toast.success("Profile deleted successfully");
        } catch (error) {
            console.log("Error in deleting profile", error);
            toast.error("Profile not deleted");
        }
    };

    const chageTimeto12hour = (time) => {
        if (!time) return "";
        let [hours, minutes] = time.split(":").map(Number);
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // 0 ko 12 bana do
        return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
    }
    return (
        <>
            <ToastContainer />
            <div><Navbar /></div>

            {isLoading && <div className="spinner-border spinner-overlay"></div>}

            <div className="profile-container mt-5">
                {/* Left side */}
                <div className="left- d-flex">
                    <div className="profile-pic" onClick={() => setshowForm(true)}>
                        <img
                            src={
                                doctor?.profile?.imageName && doctor.profile.imageName.trim() !== ""
                                    ? doctor.profile.imageName
                                    : "./assets/default.png"
                            }
                            alt="Doctor"
                        />
                    </div>
                    <div className="Content-box">
                        <h4 className="fw-bold"><b>{doctor.name}</b></h4>
                        <h5>{doctor?.doctorInfo?.specialization}</h5>
                        <h6>{doctor?.profile?.address}</h6>
                    </div>
                </div>

                {/* Right side */}
                <div className="rigth-container pt-2">
                    {/* About Doctor */}
                    <section className="about-Doctor">
                        {isEditing ? (
                            <section className="edit-doctor-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-2">
                                        <label>Name</label><br />
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: "300px" }} />
                                    </div>
                                    <div className="mb-2">
                                        <label>Specialization</label><br />
                                        <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} style={{ width: "300px" }} />
                                    </div>
                                    <div className="mb-2">
                                        <label>Bio</label><br />
                                        <textarea name="bio" value={formData.bio} onChange={handleChange} style={{ width: "300px" }} />
                                    </div>
                                    <div className="mb-2">
                                        <label>Experience</label><br />
                                        <input type="text" name="experience" value={formData.experience} onChange={handleChange} style={{ width: "300px" }} />
                                    </div>
                                    <div className="mb-2">
                                        <label>Availability</label><br />
                                        {formData.availability.map((slot, idx) => (
                                            <div key={idx} className="d-flex mb-1 align-item-center">
                                                <input type="time" name="from" value={slot.from} onChange={(e) => handleAvailability(e, idx)} style={{ width: "150px" }} />
                                                <span className="mx-2">to</span>
                                                <input type="time" name="to" value={slot.to} onChange={(e) => handleAvailability(e, idx)} style={{ width: "150px" }}
                                                />
                                                {formData.availability.length > 1 && (
                                                    <button type="button" className="btn btn-danger btn-sm mx-2" onClick={() => removeAvailabilitySlot(idx)}>Remove</button>
                                                )}
                                            </div>
                                        ))}
                                        <button type="button" className="btn btn-add btn-sm mt-2 p-1 px-2" onClick={addAvailabilitySlot} style={{ backgroundColor: "#1B3B7D", color: 'white' }} > Add time </button>
                                    </div>

                                    <div className="mb-2">
                                        <label>Address</label><br />
                                        <input type="text" name="address" value={formData.address} onChange={handleChange} style={{ width: "300px" }} />
                                    </div>
                                    <div className="d-flex justify-content-start mt-3 ">
                                        <button type="submit" className="btn btn-success p-1 px-3">Save</button>
                                        <button type="button" className="btn btn-secondary ml-4 p-1 px-3" onClick={resetForm}> Cancel</button>
                                    </div>
                                </form>
                            </section>
                        ) : (
                            <div className="doc-data">
                                <h1><b>{doctor.name}</b></h1>
                                <p><strong>Specialization:</strong> {doctor?.doctorInfo?.specialization}</p>
                                <p><strong>Bio:</strong> {doctor?.profile?.bio}</p>
                                <p><strong>Experience:</strong> {doctor?.doctorInfo?.experience}</p>
                                <p><strong>Availability:</strong> {doctor?.doctorInfo?.availability?.map((slot, idx) => (
                                    <span key={idx}>{chageTimeto12hour(slot.from)} - {chageTimeto12hour(slot.to)}{idx !== doctor.doctorInfo.availability.length - 1 ? ", " : ""}</span>
                                ))}</p>
                                <p><strong>Address:</strong> {doctor?.profile?.address}</p>
                                <button
                                    style={{ marginLeft: "80%", backgroundColor: "#1B3B7D", color: "white" }}
                                    className="btn"
                                    onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </button>
                            </div>
                        )}
                    </section>

                    {/* Certificates / Posts */}
                    <section className="certifications p-4 m-0">
                        <div className="d-flex row mb-3 position-relative">
                            <button className={`col-md-6 border-0 py-2 ${active === "certificate" ? "active-tab" : ""}`} onClick={() => setActive("certificate")}>Certificate</button>
                            <button className={`col-md-6 border-0 py-2 ${active === "post" ? "active-tab" : ""}`} onClick={() => setActive("post")}>Post</button>
                            <div className="tab-indicator" style={{ left: active === "certificate" ? "0%" : "50%" }} />
                        </div>
                        {active === "certificate" && (
                            <div>
                                {doctor?.doctorInfo?.certificates?.length > 0 ? (
                                    doctor.doctorInfo.certificates.map((certi, index) => (
                                        <div key={index} className="container my-2">
                                            <div className="px-3 p-1">
                                                <p>{certi.name}</p>
                                                <p>{certi.description}</p>
                                                <p><strong>Date:</strong> {certi.date}</p>
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
                                {post.length > 0 ? (
                                    post.map((post, idx) => (
                                        <div key={idx} className="container my-2 post-card">
                                            <div className="px-3 p-1">
                                                <h5>{post.title}</h5>
                                                <p>{post.content}</p>
                                                {post.postImage && <img src={post.postImage} alt="Post" className="post-media" />}
                                                {post.postVideo && (
                                                    <video controls className="post-media" src={post.postVideo}>
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}
                                                <p className="post-date"><strong>Date:</strong> {new Date(post.createDate).toLocaleDateString()}</p>
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

            {/* Modal for profile image update/delete */}
            {showForm && (
                <div className="modal-overlay" onClick={() => setshowForm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Profile Image</h3>
                        <div className="modal-buttons">
                            <button onClick={handleProfileDelete} className="delete-btn">Delete Profile</button>
                            <label htmlFor="update-profile" className="update-btn">Update Profile</label>
                            <input type="file" id="update-profile" style={{ display: "none" }} onChange={handleProfileUpdate} />
                        </div>
                        <button className="close-btn" onClick={() => setshowForm(false)}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ViewDocProfile;
