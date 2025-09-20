import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";
import EndPoint from "../../apis/EndPoint";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./docShowAptmt.css"; // reuse doctor CSS

function PatientShowAptmt() {
  const [appointments, setAppointments] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [editingId, setEditingId] = useState(null); // track which appointment is being updated
  const [appointmentForm, setAppointmentForm] = useState({
    name: "",
    email: "",
    mobile: "",
    apmtDate: "",
    apmtTime: "",
    meetingReason: "",
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${EndPoint.viewAllAptmt}`, {
        withCredentials: true,
      });
      setAppointments(res.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const updateStatus = async (id, status, reason) => {
    try {
      let response;
      if (status === "cancelled") {
        response = await axios.patch(`${EndPoint.cancel_aptmt}${id}`, { cancelReason: reason || "Cancelled by patient" }, { withCredentials: true });
      } else if (status === "update") {
        const { name, email, mobile, apmtDate, apmtTime, meetingReason } = appointmentForm;
        response = await axios.patch(`${EndPoint.updateAptmt}${id}`, { name, email, mobile, apmtDate, apmtTime, meetingReason }, { withCredentials: true });
      }

      toast.success(response.data.message || "Status updated");
      setEditingId(null); // close form if any
      fetchAppointments();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update status");
      console.error("Error updating status:", error);
    }
  };

  const filters = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "confirm", label: "Confirmed" },
    { key: "completed", label: "Completed" },
    { key: "reject", label: "Rejected" },
    { key: "cancelled", label: "Cancelled" },
  ];

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") return -1;
    if (a.status !== "pending" && b.status === "pending") return 1;
    return 0;
  });


  const filteredAppointments =
    activeFilter === "all"
      ? sortedAppointments
      : sortedAppointments.filter((apt) => apt.status === activeFilter);

  const handleDeleteComingSoon = () => {
    toast.info("🚧 This functionality will be coming soon!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handleEditClick = (apt) => {
    setEditingId(apt._id);
    setAppointmentForm({
      name: apt.name,
      email: apt.email,
      mobile: apt.mobile,
      apmtDate: new Date(apt.apmtDate).toISOString().split("T")[0],
      apmtTime: apt.apmtTime,
      meetingReason: apt.meetingReason,
    });
  };

  const handleFormChange = (e) => {
    setAppointmentForm({ ...appointmentForm, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="appointments-container">
        <h3 className="heading">My Appointments</h3>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`filter-btn ${activeFilter === f.key ? "active" : ""}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Appointments */}
        {filteredAppointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          filteredAppointments.map((apt) => (
            <div className="appointment-card two-part" key={apt._id}>
              <div className="left-section">
                <img
                  src={apt.doctorId?.profile?.imageURL || "/assets/default.png"}
                  alt="Doctor"
                  className="profile-img"
                />
              </div>

              <div className="right-section">
                <h6><strong>{apt.doctorId?.name}</strong></h6>
                <div style={{ color: "#1B3B7D" }}><p><b>{apt.status}</b></p></div>
                <div className="details-grid">
                  <p><b>Name:</b> {apt.name}</p>
                  <p><b>Ap.Date:</b> {new Date(apt.apmtDate).toLocaleDateString()}</p>
                  <p><b>Email:</b> {apt.email}</p>
                  <p><b>Ap.Time:</b> {apt.apmtTime}</p>
                  <p><b>Mobile:</b> {apt.mobile}</p>
                  <p><b>Ap.Day:</b> {apt.apmtDay}</p>
                  <p><b>Ap.Reason:</b> {apt.meetingReason}</p>
                </div>

                <div className="btn-group">
                  {apt.status === "pending" && (
                    <>
                      <button className="btn cancel" onClick={() => updateStatus(apt._id, "cancelled")}>Cancel</button>
                      <button className="btn confirm" onClick={() => handleEditClick(apt)}>Update</button>
                    </>
                  )}

                  {apt.status === "confirm" && (
                    <button className="btn cancel" onClick={() => updateStatus(apt._id, "cancelled")}>Cancel</button>
                  )}

                  {(apt.status === "cancelled") && (
                    <button className="btn delete" onClick={handleDeleteComingSoon}>Delete</button>
                  )}
                </div>

                {/* Update form */}
                {editingId === apt._id && (
                  <div className="update-form" style={{ marginTop: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}>
                    <h6>Update Appointment</h6>
                    <input type="text" name="name" value={appointmentForm.name} onChange={handleFormChange} placeholder="Name" />
                    <input type="email" name="email" value={appointmentForm.email} onChange={handleFormChange} placeholder="Email" />
                    <input type="text" name="mobile" value={appointmentForm.mobile} onChange={handleFormChange} placeholder="Mobile" />
                    <input type="date" name="apmtDate" value={appointmentForm.apmtDate} onChange={handleFormChange} />
                    <input type="time" name="apmtTime" value={appointmentForm.apmtTime} onChange={handleFormChange} />
                    <textarea name="meetingReason" value={appointmentForm.meetingReason} onChange={handleFormChange} placeholder="Meeting Reason" />
                    <button className="btn confirm" onClick={() => updateStatus(apt._id, "update")}>Save</button>
                    <button className="btn cancel" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
      <ToastContainer position="top-center" />
    </>
  );
}

export default PatientShowAptmt;
