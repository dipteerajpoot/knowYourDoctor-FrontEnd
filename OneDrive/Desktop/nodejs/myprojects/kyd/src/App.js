import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/signIn";
import About from "./components/AboutPage/About";
import Find from "./components/Findpage/Find";
import Auth from "./components/Auth/auth";
import SignOut from "./SingOut/SignOut";
import Appointment from "./components/Appoitment/Appoitment";
import ViewDocProfile from "./components/ViewProfile/ViewDocProfile";
function App() {
  return <> 
  <ViewDocProfile/>
   {/* <Routes>
      <Route path="/" element = {<Home/>}/> 
      <Route path="/home" element = {<Home/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signOut" element={<SignOut/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/find" element={<Auth><Find/></Auth>}/>
      <Route path="/aptmt" element={<Auth><Appointment/></Auth>}/>
      </Routes> */}
  </>   
}

export default App;
