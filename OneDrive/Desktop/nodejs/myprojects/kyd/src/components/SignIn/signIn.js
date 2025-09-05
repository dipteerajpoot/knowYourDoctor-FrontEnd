import { Link, useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./signIn.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import EndPoint from "../../apis/EndPoint";
// import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
// import { signInUser, signOut } from "../../redux-config/UserSlice";
function SignIn() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: "",
        password: "",
        role: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({})
    const validate = (field, value) => {
        switch (field) {
            case "name":
                if (!value.trim()) return "Name is required";
                break;
            case "email":
                if (!value.trim()) return "email must be required";
                if (!/^[\w.%+-]+@[\w.-]+\.\w{2,}$/.test(value)) return "Email is invalid";
                break;
            case "role":
                if (!value) return "Please select role";
                break;

            default:
                return null;
        }
        return null;
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }))
        const error = validate(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error || "" }));
    }

    const handleSubmit = async (event) => {
        try {
             
            event.preventDefault();
            let newErrors = {};
            setIsLoading(true);
            for (let key in state) {
                const err = validate(key, state[key]);
                if (err)
                    newErrors[key] = err;
            }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                setIsLoading(false)
                return;
            }

            // let response = "";

            if (state.role === 'doctor') {
              let  response = await axios.post(EndPoint.doc_signIn, state, { withCredentials: true })
                // console.log("userdataStructurec = "+response);
                // dispatch(signInUser(response.data.user));
                sessionStorage.setItem("current-user", JSON.stringify(response.data.user));
                toast.success("SignIn successful")
            }

            else if (state.role === 'patient') {
              let  response = await axios.post(EndPoint.pat_signIn, state,{withCredentials:true});              
                // dispatch(signInUser(response.data.user));
                sessionStorage.setItem("current-user", JSON.stringify(response.data.patient));
                toast.success("SignIn successful",{autoClose:3000})
            }
            else {
                toast.error("Please select a valid role");
                setIsLoading(false);
                return;
            }
            setErrors({});
            setState(
                {
                    email: '',
                    password: '',
                    role: ''
                }
            )
            navigate("/find");
        }
        catch (error) {
            console.log("signin Error:", error);
            console.log("Full Response:", error?.response?.data);
            toast.error(error?.response?.data?.error || "Oops! something went wrong");

        }
        setIsLoading(false)
    }

    return <>
        <ToastContainer />
        <div className="signin-container">
            <div className="signin-box">
                <div className="back-arrow  ">
                    <Link to='/'><i className="bi bi-arrow-left"></i></Link>
                </div>
                <h2 className="signin-title">SignIn</h2>
                <form className="signin-form" onSubmit={handleSubmit}>
                    {isLoading ? <div className="spinner-border spinner-position"></div> : ""}
                    <label>Email :</label>
                    <input name='email' onChange={handleChange} type="email" placeholder="@gmail.com" />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label>Password :</label>
                    <input name="password" type="password" onChange={handleChange} placeholder="********" />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <label>Role :</label>
                    <select name="role" onChange={handleChange}>
                        <option value="">Select role</option>
                        <option value="doctor">Doctor</option>
                        <option value="patient">Patient</option>
                    </select>
                    {errors.role && <p className="error">{errors.role}.</p>}

                    <button className="signin-button" disabled={isLoading}>Continue</button>
                </form>

                <p className="signin-footer">
                    Don't have any account? <Link to="/signup">SignUp now</Link>
                </p>
            </div>
        </div>
    </>
}
export default SignIn;
