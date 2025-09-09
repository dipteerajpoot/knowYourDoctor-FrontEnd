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
    const [errors, setErrors] = useState({});

    const validate = (field, value) => {
        switch (field) {
            case "name":
                if (!value.trim()) return "Name is required";
                if (!/^[A-Za-z ]+$/.test(value)) return "Name can only contain alphabets and spaces";
                break;

            case "email":
                if (!value.trim()) return "Email is required";
                if (!/^[\w.%+-]+@[\w.-]+\.\w{2,}$/.test(value)) return "Invalid email format";
                break;

            case "mobile":
                if (!value.trim()) return "Mobile number is required";
                if (!/^[6-9]\d{9}$/.test(value)) return "Invalid numbers || Enter valid 10 digit mobile number";
                break;

            case "apmtDate":
                if (!value) return "Appointment date is required";
                if (new Date(value) < new Date().setHours(0, 0, 0, 0)) return "Date cannot be in the past";
                break;

            case "apmtTime":
                if (!value) return "Appointment time is required";
                break;

            case "meetingReason":
                if (!value.trim()) return "Reason is required";
                if (value.length < 10) return "Reason must be at least 10 characters";
                break;

            default:
                return null;
        }
        return null;
    };

    // doctor info from navigation state
    const { doctorId, dname, imageName, specialization, availability } = location.state || {};

    let [appointment, setAppointment] = useState({
        name: "",
        email: "",
        mobile: "",
        apmtDate: "",
        apmtTime: "",
        status: "pending",
        meetingReason: "",
        doctorId: doctorId,
    });

    // handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setAppointment((prev) => ({ ...prev, [name]: value }));
        const error = validate(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error || "" }));
    };


    // form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        let newErrors = {};
        for (let key in appointment) {
            const err = validate(key, appointment[key]);
            if (err) newErrors[key] = err;
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }
        try {
            console.log("Sending appointment:", appointment);
            let response = await axios.post(EndPoint.take_aptmt, appointment, { withCredentials: true });
             toast.success(response.data.message || "Appointment request sent");
            // console.log("Response from backend:", response.data);

            setAppointment({
                name: "",
                email: "",
                mobile: "",
                apmtDate: "",
                apmtTime: "",
                meetingReason: "",
                status: "pending",
                doctorId,
            });

setTimeout(() => {
  navigate("/find");
}, 1000);        } catch (error) {
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
                                {errors.name && <p className="error">{errors.name}</p>}
                                <input name="email" value={appointment.email} onChange={handleChange} type="email" placeholder="Your Email" required />
                                {errors.email && <p className="error">{errors.email}</p>}
                                <input name="mobile" value={appointment.mobile} onChange={handleChange} type="tel" placeholder="Mobile no." required />
                                {errors.mobile && <p className="error">{errors.mobile}</p>}
                                <input name="apmtDate" value={appointment.apmtDate} onChange={handleChange} type="date" required min={new Date().toISOString().split("T")[0]} />
                                {errors.apmtDate && <p className="error">{errors.apmtDate}</p>}
                                <input name="apmtTime" value={appointment.apmtTime} onChange={handleChange} type="time" required />
                                {errors.apmtTime && <p className="error">{errors.apmtTime}</p>}

                                <textarea
                                    className="p-2"
                                    name="meetingReason"
                                    value={appointment.meetingReason}
                                    onChange={handleChange}
                                    placeholder="Enter the reason of appointment"
                                    rows="3"
                                    required
                                ></textarea>
                                {errors.meetingReason && <p className="error">{errors.meetingReason}</p>}

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
                                <div>
                                    <strong>Availability:</strong>
                                    <div>
                                        {availability?.map((slot, idx) => (
                                            <div key={idx}>
                                                {slot.date ? new Date(slot.date).toLocaleDateString() : "No Date"} -{" "}
                                                {chageTimeto12hour(slot.from)} - {chageTimeto12hour(slot.to)}
                                            </div>
                                        ))}
                                    </div>
                                </div>

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
