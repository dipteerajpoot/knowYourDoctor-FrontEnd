import React, { useState } from "react";
import "./ViewDocProfile.css";
import axios from "axios";
import EndPoint from "../../apis/EndPoint";
function ViewDocProfile(){
    const [doctor,setDoctors] = useState([]);
    let loadDoctors = async() =>{
        try {
            let response = await axios.get(EndPoint.)
        } catch (error) {
            console.log("Error in fatching doctors :",error)
        }
    }
    return(
        <>
        <div className="container">
            <div className="row d-flex">
                <div className="left-Slide col-md-3 ">
                    <img src></img>
                </div>
                <div className="right-slide">

                </div>
            </div>
        </div>
        </>
    )
}
export default ViewDocProfile;

// import React from "react";
// import "./ViewDocProfile.css"
// const ViewDocProfile = () => {
//   return (
//     <div className="container py-4">
//       <div className="row">
//         {/* Left Sidebar */}
//         <div className="col-md-3 text-center p-3 sidebar">
//           <img
//             src="/assets/doctor.png"
//             alt="Doctor"
//             className="profile-img mb-3"
//           />
//           <h5 className="fw-bold">Diptee Rajput</h5>
//           <p className="text-muted">Neurologist</p>
//           <p className="email">diptee@gmail.com</p>
//           <p>Rajmohalla Nursing home</p>
//         </div>

//         {/* Right Content */}
//         <div className="col-md-9 p-4 main-content">
//           <h4 className="fw-bold">Diptee Rajput</h4>
//           <p>
//             <strong>Specialist :</strong>{" "}
//             <span className="text-primary">Neurologist</span>
//           </p>
//           <p className="about">
//             Dr. Diptee Rajput is a board-certified neurologist with over a decade of
//             experience in treating complex neurological disorders. She is
//             passionate about patient care, neuro-rehabilitation, and brain health
//             awareness.
//           </p>

//           <p><strong>Experience :</strong> 12 Years</p>
//           <p><strong>Availability :</strong> Monday to Friday, 10:00 AM - 5:00 PM</p>
//           <p><strong>Address :</strong> 401, Arya Residency, Borivali West, Mumbai, Maharashtra, India</p>

//           <div className="education mt-3">
//             <p><strong>Education :</strong></p>
//             <ul>
//               <li>MBBS from AIIMS, Delhi</li>
//               <li>MD Neurology from PGIMER, Chandigarh</li>
//             </ul>
//           </div>

//           {/* Certifications */}
//           <div className="certifications mt-4">
//             <h5 className="fw-bold">Certifications :</h5>
//             <div className="card p-3 shadow-sm">
//               <p><strong>Name :</strong> Fellowship in Epilepsy Management</p>
//               <p>
//                 <strong>Description :</strong> Advanced clinical training in
//                 diagnosis and management of epilepsy.
//               </p>
//               <p><strong>Issued By :</strong> World Federation of Neurology</p>
//               <p><strong>Year :</strong> 2018</p>

//               <img
//                 src="/assets/certificate.png"
//                 alt="Certificate"
//                 className="certificate-img mt-2"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewDocProfile;
