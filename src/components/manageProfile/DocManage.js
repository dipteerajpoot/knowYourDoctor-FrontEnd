    import { useEffect, useState } from "react";
    import "./DocManage.css";
    import axios from "axios";
    import EndPoint from "../../apis/EndPoint";
    import { Link, useLocation } from "react-router-dom";
    import Navbar from "../Navbar/Navbar";

    function ViewDocProfile() {
        const [doctor, setDoctor] = useState({});
        const location = useLocation();
        const { doctorId } = location.state || {};
        const [isEditing, setIsEditing] = useState(false);

        const [formData, setFormData] = useState({
            name: doctor?.name,
            specialization: doctor?.doctorInfo?.specialization,
            bio: doctor?.profile?.bio ,
            experience: doctor?.doctorInfo?.experience,
            availability: doctor?.availability,
            address: doctor?.profile?.address,
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await axios.patch(`${EndPoint.doc_profileUpdate}`, formData, {
                    withCredentials: true,
                });
                setIsEditing(false);
                loadDoctors();
            } catch (error) {
                console.log("Error updating profile", error);
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
        }, []);



        return (
            <>
                <div><Navbar /></div>
                <div className="profile-container mt-5">
                    <div className="left- d-flex">
                        <div className="profile-pic"><img src={doctor?.profile?.imageName || "/assets/default.png"} alt="DoctorImage" />
                        </div>
                        <div className="Content-box " >
                            <h4 className="fw-bold"><b>{doctor.name}</b></h4>
                            <h5>{doctor?.doctorInfo?.specialization}</h5>
                            <h6>{doctor?.profile?.address}</h6>
                        </div>  
                    </div>

                    <div className="rigth-container  pt-2">
                        <section className="about-Doctor">
                            {isEditing ? ( <section className="edit-doctor-form">
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-2">
                                        <label>Name</label><br/>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={doctor.name} style={{width:"300px"}} />
                                    </div>
                                    <div className="mb-2">
                                        <label>Specialization</label><br/>
                                        <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} placeholder={doctor?.doctorInfo?.specialization} style={{width:"300px"}}/>
                                    </div>
                                    <div className="mb-2">
                                      <label>Bio</label><br/>
                                        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder={doctor?.profile?.bio} style={{width:"300px"}}/>
                                    </div>
                                    <div className="mb-2">
                                     <label>Experience</label><br/>
                                     <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder={doctor?.doctorInfo?.experience} style={{width:"300px"}}/>
                                    </div>
                                    <div className="mb-2">
                                        <label>Availability</label><br/>
                                        <input type="text" name="availability" value={formData.availability} onChange={handleChange} placeholder={doctor?.availability} style={{width:"300px"}}/>
                                    </div>
                                    <div className="mb-2">
                                        <label>Address</label><br/>
                                        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder={doctor?.profile?.address} style={{width:"300px"}}/>
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
                                    style={{marginLeft:"80%", backgroundColor:"#1B3B7D", color:"white"}}
                                    className="btn"
                                    onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </button>
                            </div>
                            )}
                        </section>

                        <section className="certifications p-4 m-0 ">
                            <div className="mt-2"><h2><b>Certifications</b></h2>  <hr />
                            </div>
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
                        </section>
                    </div>
                </div>
            </>
        )
    }
    export default ViewDocProfile;


    // import { useEffect, useState } from "react";
    // import "./DocManage.css";
    // import axios from "axios";
    // import EndPoint from "../../apis/EndPoint";
    // import { useLocation } from "react-router-dom";
    // import Navbar from "../Navbar/Navbar";

    // function ViewDocProfile() {
    //   const [doctor, setDoctor] = useState({});
    //   const location = useLocation();
    //   const { doctorId } = location.state || {};
    //   const [isEditing, setIsEditing] = useState(false);

    //   const [formData, setFormData] = useState({
    //     name: "",
    //     specialization: "",
    //     bio: "",
    //     experience: "",
    //     availability: "",
    //     address: "",
    //   });

    //   const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    //   };

    //   const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //       await axios.patch(`${EndPoint.doc_profileUpdate}`, formData, {
    //         withCredentials: true,
    //       });
    //       setIsEditing(false);
    //       loadDoctor();
    //     } catch (error) {
    //       console.log("Error updating profile", error);
    //     }
    //   };

    //   const loadDoctor = async () => {
    //     try {
    //       let response = await axios.get(
    //         `${EndPoint.doc_profile}/${doctorId}`,
    //         { withCredentials: true }
    //       );
    //       const doc = response.data.doctor || {};
    //       setDoctor(doc);

    //       // Pre-fill formData when loading
    //       setFormData({
    //         name: doc?.name || "",
    //         specialization: doc?.doctorInfo?.specialization || "",
    //         bio: doc?.profile?.bio || "",
    //         experience: doc?.doctorInfo?.experience || "",
    //         availability: doc?.availability || "",
    //         address: doc?.profile?.address || "",
    //       });
    //     } catch (error) {
    //       console.log("Error fetching doctor:", error);
    //     }
    //   };

    //   useEffect(() => {
    //     loadDoctor();
    //   }, []);

    //   return (
    //     <>
    //       <Navbar />
    //       <div className="profile-container">
    //         {/* Left side profile pic */}
    //         <div className="left-section">
    //           <div className="profile-pic">
    //             <img
    //               src={doctor?.profile?.imageName || "/assets/default.png"}
    //               alt="Doctor"
    //             />
    //           </div>
    //           <div className="profile-info">
    //             <h4 className="fw-bold">{doctor?.name}</h4>
    //             <h5>{doctor?.doctorInfo?.specialization}</h5>
    //             <p>{doctor?.profile?.address}</p>
    //           </div>
    //         </div>

    //         {/* Right section */}
    //         <div className="right-section">
    //           {!isEditing ? (
    //             <section className="about-doctor">
    //               <h2>About Doctor</h2>
    //               <p><b>Name:</b> {doctor?.name}</p>
    //               <p><b>Specialization:</b> {doctor?.doctorInfo?.specialization}</p>
    //               <p><b>Bio:</b> {doctor?.profile?.bio}</p>
    //               <p><b>Experience:</b> {doctor?.doctorInfo?.experience}</p>
    //               <p><b>Availability:</b> {doctor?.availability}</p>
    //               <p><b>Address:</b> {doctor?.profile?.address}</p>
    //               <button
    //                 className="btn btn-primary mt-3"
    //                 onClick={() => setIsEditing(true)}>
    //                 Edit Profile
    //               </button>
    //             </section>
    //           ) : (
    //             <section className="edit-doctor-form">
    //               <h2>Edit Profile</h2>
    //               <form onSubmit={handleSubmit} className="form">
    //                 <div className="mb-3">
    //                   <label>Name</label>
    //                   <input
    //                     type="text"
    //                     name="name"
    //                     value={formData.name}
    //                     onChange={handleChange}
    //                     className="form-control"
    //                   />
    //                 </div>
    //                 <div className="mb-3">
    //                   <label>Specialization</label>
    //                   <input
    //                     type="text"
    //                     name="specialization"
    //                     value={formData.specialization}
    //                     onChange={handleChange}
    //                     className="form-control"
    //                   />
    //                 </div>
    //                 <div className="mb-3">
    //                   <label>Bio</label>
    //                   <textarea
    //                     name="bio"
    //                     value={formData.bio}
    //                     onChange={handleChange}
    //                     className="form-control"
    //                   ></textarea>
    //                 </div>
    //                 <div className="mb-3">
    //                   <label>Experience</label>
    //                   <input
    //                     type="text"
    //                     name="experience"
    //                     value={formData.experience}
    //                     onChange={handleChange}
    //                     className="form-control"
    //                   />
    //                 </div>
    //                 <div className="mb-3">
    //                   <label>Availability</label>
    //                   <input
    //                     type="text"
    //                     name="availability"
    //                     value={formData.availability}
    //                     onChange={handleChange}
    //                     className="form-control"
    //                   />
    //                 </div>
    //                 <div className="mb-3">
    //                   <label>Address</label>
    //                   <input
    //                     type="text"
    //                     name="address"
    //                     value={formData.address}
    //                     onChange={handleChange}
    //                     className="form-control"
    //                   />
    //                 </div>

    //                 <button type="submit" className="btn btn-success">
    //                   Save
    //                 </button>
    //                 <button
    //                   type="button"
    //                   className="btn btn-secondary ms-2"
    //                   onClick={() => setIsEditing(false)}
    //                 >
    //                   Cancel
    //                 </button>
    //               </form>
    //             </section>
    //           )}
    //         </div>
    //       </div>
    //     </>
    //   );
    // }

    // export default ViewDocProfile;
