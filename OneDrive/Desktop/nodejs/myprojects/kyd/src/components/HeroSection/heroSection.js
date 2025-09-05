import React from 'react';
import './heroSection.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
function HeroSection() {
  return <>
    <div>
      <div className="hero-page">
        <div className="hero-text">
          <h1>Welcome to <br/>Know Your Doctor</h1>
          <p>We're here to care for your life</p>
          <Link to="/SignUp" className="joinbtn">Join now <i className="bi bi-arrow-right "></i></Link>
        </div>
      </div>

      <div className="hero-cards">
        <div className="card">
          <h4>Our goal –</h4>
          <p>
            Our goal is to connect patients with qualified and trusted doctors through a simple and secure platform. We aim to make healthcare access easy.
          </p>
        </div>
        <div className="card">
          <h4>We believe –</h4>
          <p>
            We believe that every patient deserves access to the right doctor — and every doctor deserves a platform to showcase their expertise.
          </p>
        </div>
        <div className="card">
          <h4>Why choose us –</h4>
          <p>
            We’re not just a directory — we’re a trusted network. With verified doctor profiles, smart filters, and real-time availability, we make finding healthcare fast, reliable, and stress-free.
          </p>
        </div>
      </div>
      </div>
</>
}

export default HeroSection;
