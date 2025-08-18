import "./Appoitment.css"
import { useState } from "react";
import Footer from "../Footer/footer";
import axios from "axios";
import EndPoint from "../../apis/EndPoint";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
function Appointment() {
    const location = useLocation();
    console.log("location "+location.state)
    const { doctorId, dname, imageName, specialization, availability } = location.state || {};
    console.log("doctorId "+doctorId)
    let [appointment, setAppointment] = useState({
        name: "",
        email: "",
        mobile: "",
        date: "",
        time: "",
        day: "",
        status: "pending",
        meetingReason: "",
        doctorId: doctorId,
    });

    const handleChange = async (event) => {
        const { name, value } = event.target;
        setAppointment((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
                    console.log(appointment)
            let response = await axios.post(EndPoint.take_aptmt, appointment,{withCredentials:true});
            toast.success(response.data.message || "Appointment request send");
            setAppointment({
                name: "",
                email: "",
                mobile: "",
                date: "",
                time: "",
                day: "",
                meetingReason: "",
                status: "pending",
                doctorId,
            });
        }
        catch (error) {
            toast.error(error.response?.data?.error || "Appointment request failed")
            console.log("Error while fatching Appointment", error);
        }
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
                        <div className="form-container">
                            <h2><b> <i className="bi bi-file-earmark-plus " style={{color:"#2757b8ff",}}></i> Book An Appointment</b></h2>
                            <form onSubmit={handleSubmit}>
                                <input name="name" value={appointment.name} onChange={handleChange} type="text" placeholder="Your Name" required />
                                <input name="email" value={appointment.email} onChange={handleChange} type="text" placeholder="Your Email" required />
                                <input name="mobile" value={appointment.mobile} onChange={handleChange} type="tel" placeholder="Mobile no." required />
                                <input name="date" value={appointment.date} onChange={handleChange} type="date" required />
                                <input name="time" value={appointment.time} onChange={handleChange} type="time" required />
                                <input name="day" value={appointment.day} onChange={handleChange} type="text" placeholder="Appointment Day" required />
                                <textarea className="p-2" name="meetingReason" value={appointment.meetingReason} onChange={handleChange} placeholder="Enter the reason of appointment" rows="3" required ></textarea>
                                <button type="submit">APPOINTMENT NOW</button>
                            </form>
                        </div>

                        <div className="Appoinment-detail">
                            <div className="doctor-img">
                                <img src={imageName ? imageName : "/assets/default.png"} alt="Dr.image" />
                            </div>
                            <div className="doctor-info">
                                <h3>{dname}</h3>
                                <h6>Specialist:{specialization}</h6>
                                <h6>Availability:</h6>;
                                {availability && availability.length > 0 ? (
                                     <ul>
                                        {availability.map((slot, index) => (
                                            <li key={index}> {slot.day}:{slot.from}-{slot.to}</li>
                                        ))}
                                    </ul>
                                ) : (<p>No availability added</p>)}
                            </div>
                        </div>
                    </div>
                </div>


                <Footer />
            </div>
        </>
    );
};

export default Appointment;
 