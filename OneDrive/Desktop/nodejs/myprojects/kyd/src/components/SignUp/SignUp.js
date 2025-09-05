import "./Signup.css";
import axios from "axios";
import { useState } from "react";
import EndPoint from "../../apis/EndPoint";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        role: ""
    });
    const [errors, setErrors] = useState({});
    const validate = (field, value) => {
        switch (field) {
            case "name":
                if (!value.trim()) return "Name is required";
                if(!/^[A-Za-z _-]+$/.test(value)) return "name only contain Alphabet, space,hyphen and underscore"

                break;
            case "email":
                if (!value.trim()) return "email must be required";
                if (!/^[\w.%+-]+@[\w.-]+\.\w{2,}$/.test(value)) return "Email is invalid";
                break;
            case "password":
                if (!value.trim()) return "Password is required";
                if (value.length < 8 || value.length > 12) return "Password must bee between 8 to 12 charactor";
                break;
            case "confirmpassword":
                if (state.password !== value) return "password not Match"
                break;
            case "role":
                if (!value) return "Please select a role";
                break;
            default:
                return null;
        }
        return null;
    };

    //jav user input mai change hoga
    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));

        const error = validate(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error || "" }));
    };



    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            let newErrors = {};
            if (!acceptedTerms) {
                toast.error("Please accept the terms and conditions");
                setIsLoading(false);
                return;
            }
            for (let key in state) {
                const err = validate(key, state[key]);
                if (err)
                    newErrors[key] = err;
            }


            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            setIsLoading(true);
            if (state.role === 'doctor') {
               let response = await axios.post(EndPoint.doc_signUp, state); 
                toast.success(response.data.message || "SignUp successful , please cheque your Email for validate your Account");
            }
            else if (state.role === 'patient') {
               let response = await axios.post(EndPoint.pat_signUp, state)
                 toast.success(response.data.message|| "SignUp successful,please cheque your Email for validates your Account");
            }
            else {
                toast.error("Please select a valid role");
                return;
            }
            setErrors({});
            setState(
                {
                    name: '',
                    email: '',
                    password: '',
                    confirmpassword: '',
                    role: ''
                }
            )
            setTimeout(() => {
                navigate("/signin"); 
            }, 2000);
        }
        catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.error || "Oops! something went wrong")
        }
        setAcceptedTerms(false)
        setIsLoading(false);
    }

    return <>
        <ToastContainer />
        <div className="container">
                <div className="back-arrow  ">
                    <Link to='/'><i className="bi bi-arrow-left"></i></Link>
                </div>
            <div className="Img-container ">

                <div className="Img">
                    <div className="signup-text">
                        <h2>Welcome to Know your Doctor</h2>
                        <p>Create your account and take the first step<br />towards better healthcare connection.</p>
                    </div>
                </div>  
            </div>

            <div className="SignUpContiner ">
                <h2 className="signup-title"><b>SignUp</b>  </h2>
                <form onSubmit={handleSubmit} className="signup-form ">
                    {isLoading ? <div className="spinner-border spinner-position"></div> : ""}
                    <label>Name :</label>
                    <input value={state.name} onChange={handleChange} name="name" type="text" placeholder="name" />
                    {errors.name && <p className="error" >{errors.name}</p>}

                    <label>Email :</label>
                    <input value={state.email} onChange={handleChange} type="email" name="email" placeholder="@gmail.com.." />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label>Password :</label>
                    <input value={state.password} onChange={handleChange} type="password" name="password" placeholder="*******" />
                    {errors.password && <p className="error">{errors.password}</p>}


                    <label >Confirm Password :</label>
                    <input value={state.confirmpassword} onChange={handleChange} type="password" name="confirmpassword" placeholder="*******" />
                    {errors.confirmpassword && <p className="error">{errors.confirmpassword}</p>}


                    <label>Role :</label>
                    <select name="role" value={state.role} onChange={handleChange}>
                        <option value="">Select role</option>
                        <option value="doctor">Doctor</option>
                        <option value="patient">Patient</option>
                    </select>
                    {errors.role && <p className="error">{errors.role}</p>}

                    <div className="terms">
                        <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} />
                        <label >Accept all <span>terms and condition</span></label>
                    </div>

                    <button type="submit" className="signup-button" disabled={isLoading}>Continue</button>
                    <Link className="hv-ac" to="/signin"><span>All-ready have Account ? </span></Link>
                </form>
            </div>
        </div>
    </>
}

export default Signup;