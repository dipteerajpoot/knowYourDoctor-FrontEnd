import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/signIn";
import About from "./components/AboutPage/About";
import Find from "./components/Findpage/Find";
import Auth from "./components/Auth/auth";
import SignOut from "./SingOut/SignOut";
import Appointment from "./components/Appoitment/Appoitment";
import ViewDocProfile from "./components/ViewDocProfile/ViewDocProfile";
import { Navigate } from "react-router-dom";
import DocManage from "./components/manageProfile/DocManage";
import PatientManage from "./components/manageProfile/PatientManage";
import AppointmentPage from "./components/ShowAptmt/docShowAptmt"
import PatientAppointment from "./components/ShowAptmt/PatientShowAptmt";
function App() {
         const isVarified = sessionStorage.getItem("current-user");
  return <>

    {/* <AppointmentPage/> */}
    <Routes>

      <Route path="/" element={isVarified ? <Navigate to="/find" /> : <Navigate to="/home" />} />
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/find" element={<Auth><Find /></Auth>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signOut" element={<SignOut />} />
      <Route path="/about" element={<About />} />
      <Route path="/aptmt" element={<Auth><Appointment /></Auth>} />
      <Route path="/viewDocProfile" element={<Auth><ViewDocProfile/></Auth>}/>
      <Route path="/docProfile" element={< DocManage/>} />
      <Route path="/patientProfile" element={<PatientManage/>}/>
      <Route path="/AppointmentPage" element={<AppointmentPage/>} />
      <Route path="/PatientAppointment" element={<PatientAppointment/>}/>
    </Routes>
  </>
}

export default App;
