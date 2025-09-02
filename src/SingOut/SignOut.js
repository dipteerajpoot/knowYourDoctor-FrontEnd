import {useNavigate } from "react-router-dom";
import EndPoint from "../apis/EndPoint";
import axios from "axios";
import {useEffect } from "react";
import { toast } from "react-toastify";

function SignOut() {
    const navigate = useNavigate();
    useEffect(()=>{
           const handleChange = async () => {
        try{
        const user = JSON.parse(sessionStorage.getItem("current-user"));
        if (user?.role === 'doctor') {
        await axios.post(EndPoint.doc_signOut,{},{withCredentials :true});
            sessionStorage.removeItem("current-user")
            sessionStorage.clear();
            toast.success("logged out successfully",{autoClose:400})
            navigate("/home");  
        }
        else if (user?.role === 'patient') {
          await axios.post(EndPoint.pt_signOut,{},{withCredentials :true});
            sessionStorage.removeItem("currunt-user");
            sessionStorage.clear();
            toast.success("logged out successfully",{autoClose :400})
            navigate("/home");
        }
        }
        catch(error){
            console.log(error);
            toast.error(error.response?.data?.message|| "LogOut failed");
        }
    }

        handleChange();
    },[navigate])

    return null;
}
export default SignOut;