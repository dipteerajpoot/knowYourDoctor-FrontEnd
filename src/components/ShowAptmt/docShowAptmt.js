import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";
import EndPoint from "../../apis/EndPoint";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./docShowAptmt.css";

function AppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetchAppointments();
  }, []);

  // fetch all appointments
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

  // update appointment status
  const updateStatus = async (id, status) => {
    try {
      let response;
      if (status === "confirm") {
        response = await axios.patch(`${EndPoint.confirm_aptmt}${id}`, { status }, { withCredentials: true });
      } else if (status === "reject") {
        response = await axios.patch(`${EndPoint.reject_aptmt}${id}`, { reason: "Doctor rejected" }, { withCredentials: true });
      } else if (status === "completed") {
        response = await axios.patch(`${EndPoint.complete_aptmt}${id}`, { status }, { withCredentials: true });
      } else if (status === "cancelled") {
        response = await axios.patch(`${EndPoint.cancel_aptmt}${id}`, { cancelReason: "Cancelled by doctor" }, { withCredentials: true });
      } else if (status === "delete") {
        response = await axios.delete(`${EndPoint.delete_aptmt}${id}`, { withCredentials: true });
      }

      toast.success(response.data.message || "Status updated");
      fetchAppointments();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update status");
      console.error("Error updating status:", error);
    }
  };

  // filters
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
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};


  return (
    <>
      <Navbar />
      <div className="appointments-container">
        <h3 className="heading">All Appointments</h3>

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
              {/* Left: Profile */}
              <div className="left-section">
                <img
                  src={
                    apt.patientId?.profile?.imageURL || "/assets/default.png"}
                  alt="Patient"
                  className="profile-img"
                />
              </div>

              {/* Right: Details */}
              <div className="right-section">
                <h6><strong>{apt.patientId?.name}</strong></h6>
                <div className="" style={{ color: "#1B3B7D" }}><p><b>{apt.status}</b></p></div>
                <div className="details-grid">
                  <p><b>Name:</b>{apt.name}</p>
                  <p><b>Ap.Date:</b> {new Date(apt.apmtDate).toLocaleDateString()}</p>
                  <p><b>Email:</b> {apt.email}</p>
                  <p><b>Ap.Time:</b> {apt.apmtTime}</p>
                  <p><b>Mobile:</b> {apt.mobile}</p>
                  <p><b>Ap.Day:</b>{apt.apmtDay}</p>
                  <p><b>Ap.Reason:</b> {apt.meetingReason}</p>
                </div>

                <div className="btn-group">
                  {apt.status === "pending" && (
                    <>
                      <button className="btn confirm" onClick={() => updateStatus(apt._id, "confirm")}>Confirm</button>
                      <button className="btn reject" onClick={() => updateStatus(apt._id, "reject")}>Reject</button>
                    </>
                  )}

                  {apt.status === "confirm" && (
                    <>
                      <button className="btn complete" onClick={() => updateStatus(apt._id, "completed")}>Completed</button>
                      <button className="btn cancel" onClick={() => updateStatus(apt._id, "cancelled")}>Cancel</button>
                    </>
                  )}

                  {(apt.status === "cancelled" || apt.status === "completed" || apt.status === "reject") && (
                    <button className="btn delete" onClick={() =>  handleDeleteComingSoon()}>Delete</button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default AppointmentPage;
