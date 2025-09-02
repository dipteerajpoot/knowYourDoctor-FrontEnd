import "./Appoitment.css";
import { useState } from "react";
import Footer from "../Footer/footer";
import axios from "axios";
import EndPoint from "../../apis/EndPoint";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Appointment() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    // doctor info from navigation state
    const { doctorId, dname, imageName, specialization, availability } = location.state || {};

    let [appointment, setAppointment] = useState({
        name: "",
        email: "",
        mobile: "",
        apmtDate: "",
        apmtTime: "",
        apmtDay: "",
        status: "pending",
        meetingReason: "",
        doctorId: doctorId,
    });

    // handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setAppointment((prev) => ({ ...prev, [name]: value }));
    };

    // form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            console.log("Sending appointment:", appointment);
            let response = await axios.post(EndPoint.take_aptmt, appointment, { withCredentials: true });
            toast.success(response.data.message || "Appointment request sent");

            // reset form
            setAppointment({
                name: "",
                email: "",
                mobile: "",
                apmtDate: "",
                apmtTime: "",
                apmtDay: "",
                meetingReason: "",
                status: "pending",
                doctorId,
            });

            navigate("/find");
        } catch (error) {
            toast.error(error.response?.data?.error || "Appointment request failed");
            console.log("Error while sending Appointment", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ safe time formatting
    const formatTime24to12 = (timeStr) => {
        if (!timeStr || typeof timeStr !== "string" || !timeStr.includes(":")) {
            return "N/A";  // avoid NaN
        }
        const [h, m] = timeStr.split(":").map(Number);
        if (isNaN(h) || isNaN(m)) return "N/A";
        const suffix = h >= 12 ? "PM" : "AM";
        const hour = ((h + 11) % 12) + 1;
        return `${hour}:${m.toString().padStart(2, "0")} ${suffix}`;
    };

    return (
        <>
            <ToastContainer />
            <div>
                <div className="header">
                    <h1>Appointment</h1>
                </div>

                <div className="appointment">
                    <div className="appointment-box">
                        {loading ? <div className="spinner-border spinner-position"></div> : ""}

                        {/* Left Form Section */}
                        <div className="form-container">
                            <h2>
                                <b>
                                    <i className="bi bi-file-earmark-plus" style={{ color: "#2757b8ff" }}></i> Book An Appointment
                                </b>
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <input name="name" value={appointment.name} onChange={handleChange} type="text" placeholder="Your Name" required />
                                <input name="email" value={appointment.email} onChange={handleChange} type="email" placeholder="Your Email" required />
                                <input name="mobile" value={appointment.mobile} onChange={handleChange} type="tel" placeholder="Mobile no." required />
                                <input name="apmtDate" value={appointment.apmtDate} onChange={handleChange} type="date" required />
                                <input name="apmtTime" value={appointment.apmtTime} onChange={handleChange} type="time" required />
                                <input name="apmtDay" value={appointment.apmtDay} onChange={handleChange} type="text" placeholder="Appointment Day" required />
                                <textarea
                                    className="p-2"
                                    name="meetingReason"
                                    value={appointment.meetingReason}
                                    onChange={handleChange}
                                    placeholder="Enter the reason of appointment"
                                    rows="3"
                                    required
                                ></textarea>
                                <button type="submit">APPOINTMENT NOW</button>
                            </form>
                        </div>

                        {/* Right Doctor Details */}
                        <div className="Appoinment-detail">
                            <div className="doctor-img">
                                <img src={imageName ? imageName : "/assets/default.png"} alt="Dr.image" />
                            </div>
                            <div className="doctor-info">
                                <h3>{dname}</h3>
                                <h6>Specialist: {specialization}</h6>
                                <h6>Availability:</h6>
                                {availability && availability.length > 0 ? (
                                    <ul>
                                        {availability.map((slot, index) => (
                                            <li key={index}>
                                                {slot.day}: {formatTime24to12(slot.from)} - {formatTime24to12(slot.to)}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No availability added</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default Appointment;
