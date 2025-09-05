import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { isUserExit } from "../Auth/auth";


function Navbar() {
  const navigate = useNavigate();
  return <>
    <nav className="navbar">
      <div className="continer">
        <div className="logo">
          <img src="../assets/logo2.png" alt="Logo" />
        </div>
        {isUserExit() &&
          <div className="search-content">
            <div className="search-box">
              <Link><i className="bi bi-search"></i></Link>
              <input type="text" placeholder="Search Here...." />
            </div>

            <div className="dropdownbtn">
              <select>
                <option>Disease</option>
                <option>BoneFever</option>
                <option>Cancer</option>
              </select>
              <select>
                <option>City</option>
                <option>Mumbai</option>
                <option>Delhi</option>
              </select>
            </div>
          </div>
        }
      </div>
      <div className="nav-actions">
        <Link to="/about">About</Link>
        {isUserExit() && <Link to="/signOut">Sign-Out</Link>}
        {isUserExit() && <Link to="/appointment"><i className="bi bi-bookmark-plus-fill"></i></Link>}
        {isUserExit() && <Link to="/profile" style={{ color: "slategray" }} className="mr-2"><i className="profile bi bi-person-circle"></i></Link>}
        {!isUserExit() && <Link to="/Signup" >SignUp</Link>}
        {!isUserExit() && <Link to="/Signin"> SignIn</Link>}
      </div>

    </nav>
  </>
}
export default Navbar;
