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
                                <input name="apmtDate" value={appointment.apmtDate} onChange={handleChange} type="date" required  min={new Date().toISOString().split("T")[0]}/>
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
                                <p>
                                    Availability : {availability?.map((slot, idx) => (
                                        <span key={idx}>{chageTimeto12hour(slot.from)} - {chageTimeto12hour(slot.to)}{idx !== availability.length - 1 ? ", " : ""}</span>
                                    ))}
                                </p>
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
