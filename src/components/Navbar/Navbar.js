import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { isUserExit } from "../Auth/auth";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

   const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };



function getUser(){
  return JSON.parse(sessionStorage.getItem("current-user"));
}
const user = getUser();
const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/find") {
      const delayDebounce = setTimeout(() => {
        navigate("/find", { state: { search } });
      }, 500);

      return () => clearTimeout(delayDebounce);
    }
  }, [search, navigate, location.pathname]);


const handleSearch = async (e) => {
  e.preventDefault();
  if (search.trim()) {
    navigate("/find", { state: { search } })
  } else {
    navigate("/find", { state: { search: "" } });
  }
}
useEffect(() => {
  function handleClickOutside(e) {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

return (
  <nav className="navbar">
    <div className="logo">
      <img src="../assets/logo2.png" alt="Logo" />
    </div>

    {/* Center: Search (only if logged in) */}
    {isUserExit() && (
      <div className="search-content">
        <form onSubmit={handleSearch}>
          <div className="search-box">
            <Link ><i className="bi bi-search"></i></Link>
            <input name="search" type="text" placeholder="Search Here..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </form>
      </div>
    )}  

    <div className="nav-actions">
      <Link to="/about">About</Link>
      {isUserExit() && (
        <Link to="/appointment">
          <i className="bi bi-bookmark-plus-fill" onClick={() => {"/watchAptmt"}}  style={{ cursor: "pointer" }} title="Appointment"></i>
        </Link>
      )}

      {isUserExit() && (
        <div
          className={`profile-dropdown ${open ? "active" : ""}`}
          ref={dropdownRef}>
          <i className="bi bi-person-circle profile" onClick={() => setOpen(!open)} title="Profile"></i>
          {open && (
            <div className="dropdown-menu">
              {user?.role === "doctor" ? (
                  <Link to="/docProfile">Manage Profile</Link>
                ) : (
                  <Link to="/patientProfile">Manage Profile</Link>
                )}
              <Link to="/signOut">Sign-Out</Link>
            </div>
          )}
        </div>
      )}

      {!isUserExit() && <Link to="/Signup">SignUp</Link>}
      {!isUserExit() && <Link to="/Signin">SignIn</Link>}
    </div>
  </nav>
);
}

export default Navbar;
