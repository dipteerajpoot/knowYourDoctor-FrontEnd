import { useEffect, useState } from "react";
import "./PatientManage.css";
import axios from "axios";
import EndPoint from "../../apis/EndPoint";
import Navbar from "../Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";

function PatientManage() {
  const [patient, setPatient] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    bio: "",
    age: "",
    gender: "",
  });

  const loadPatient = async () => {
    try {
      let response = await axios.get(`${EndPoint.pt_Profile}`, { withCredentials: true });
      setPatient(response.data.patient || {});
      setFormData({
        name: response.data.patient?.name || "",
        email: response.data.patient?.email || "",
        address: response.data.patient?.profile?.address || "",
        phone: response.data.patient?.profile?.phone || "",
        bio: response.data.patient?.profile?.bio || "",
        age: response.data.patient?.patientInfo?.age || "",
        gender: response.data.patient?.patientInfo?.gender || "",
      });
    } catch (error) {
      console.log("Error fetching patient:", error);
    }
  };

  useEffect(() => {
    loadPatient();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.patch(`${EndPoint.pt_updateProfile}`, formData, { withCredentials: true });
      toast.success("Profile updated successfully");
      setIsEditing(false);
      loadPatient();
    } catch (error) {
      console.log("Error updating profile", error);
      toast.error("Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("imageName", file);

    try {
      setIsLoading(true);
      await axios.patch(`${EndPoint.pt_updateProfile}`, data, { withCredentials: true });
      toast.success("Profile image updated");
      setShowForm(false);
      loadPatient();
    } catch (error) {
      console.log("Image update error:", error);
      toast.error("Failed to update image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileDelete = async () => {
    try {
      const confirm = window.confirm("Delete profile photo?");
      if (!confirm) return;
      const responseImg = await fetch("/assets/default.png");
      const blob = await responseImg.blob();
      const file = new File([blob], "default.png", { type: blob.type });

      const data = new FormData();
      data.append("imageName", file);

      await axios.patch(`${EndPoint.pt_updateProfile}`, data, { withCredentials: true });
      toast.success("Profile photo removed");
      setShowForm(false);
      loadPatient();
    } catch (error) {
      console.log("Delete error:", error);
      toast.error("Failed to delete image");
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      {isLoading && <div className="spinner-overlay"></div>}

      <div className="profile-card ">
        {/* Left: Profile Image */}
        <div className="profile-image" onClick={() => setShowForm(true)}>
          <img
            src={
              patient?.profile?.imageName && patient.profile.imageName.trim() !== ""
                ? patient.profile.imageName
                : "./assets/default.png"
            }
            alt="Patient"
          />
        </div>

        {/* Right: Info */}
        <div className="profile-info">
          {!isEditing ? (
            <>
              <h2>{patient.name}</h2>
              <p className="bio">{patient?.profile?.bio}</p>

              <div className="info-grid">
                <div className="info-item">
                  <strong>Email</strong>
                  {patient.email}
                </div>
                <div className="info-item">
                  <strong>Age</strong>
                  {patient?.patientInfo?.age}
                </div>
                <div className="info-item">
                  <strong>Gender</strong>
                  {patient?.patientInfo?.gender}
                </div>
                <div className="info-item">
                  <strong>Phone</strong>
                  {patient?.profile?.phone}
                </div>
                <div className="info-item" style={{ gridColumn: "span 2" }}>
                  <strong>Address</strong>
                  {patient?.profile?.address}
                </div>
              </div>

              <button className="btn-primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </>
          ) : (
            <form className="edit-form" onSubmit={handleSubmit}>
              <input type="text" name="name" value={formData.name} placeholder="Name" onChange={handleChange} />
              <input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} />
              <input type="text" name="phone" value={formData.phone} placeholder="Phone" onChange={handleChange} />
              <input type="text" name="address" value={formData.address} placeholder="Address" onChange={handleChange} />
              <textarea name="bio" value={formData.bio} placeholder="Bio" onChange={handleChange} />
              <input type="number" name="age" value={formData.age} placeholder="Age" onChange={handleChange} />
              <input type="text" name="gender" value={formData.gender} placeholder="Gender" onChange={handleChange} />

              <button type="submit" className="btn-primary">Save</button>
            </form>
          )}
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Profile Image</h3>

            <div className="modal-preview">
              <img
                src={
                  patient?.profile?.imageName && patient.profile.imageName.trim() !== ""
                    ? patient.profile.imageName
                    : "./assets/default.png"
                }
                alt="Profile Preview"
              />
            </div>

            <div className="modal-buttons">
              <button onClick={handleProfileDelete} className="delete-btn">Delete</button>
              <label htmlFor="update-profile" className="update-btn">Update</label>
              <input type="file" id="update-profile" style={{ display: "none" }} onChange={handleProfileUpdate} />
            </div>

            <button className="close-btn" onClick={() => setShowForm(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default PatientManage;
