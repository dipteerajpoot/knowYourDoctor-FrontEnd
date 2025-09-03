import React from 'react';
import './heroSection.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
function HeroSection() {
  return <>
    <div className='mt-5'>
      <div className="hero-page">
        <div className="hero-text">
          <h1>Welcome to <br/>Know Your Doctor</h1>
          <p>We're here to care for your life</p>
          <Link to="/SignUp" className="joinbtn">Join now <i className="bi bi-arrow-right "></i></Link>
        </div>
      </div>

      <div className="hero-cards">
        <div className="card">
          <h4><i className="bi bi-bullseye card-icon"></i>Our goal –</h4>
          <p>
            Our goal is to connect patients with qualified and trusted doctors through a simple and secure platform. We aim to make healthcare access easy.
          </p>
        </div>
        <div className="card">
          <h4><i className="bi bi-lightbulb card-icon"></i>We believe –</h4>
          <p>
            We believe that every patient deserves access to the right doctor — and every doctor deserves a platform to showcase their expertise.
          </p>
        </div>
        <div className="card">
          <h4><i className="bi bi-shield-check card-icon"></i>Why choose us –</h4>
          <p>
            We’re not just a directory — we’re a trusted network. With verified doctor profiles, smart filters, and real-time availability, we make finding healthcare fast, reliable, and stress-free.
          </p>
        </div>
      </div>

               {/* How it Works Section */}
        <div className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <i className="bi bi-search step-icon"></i>
              <h4>Search Doctors</h4>
              <p>Find doctors by name, city, or specialization in just a few clicks.</p>
            </div>
            <div className="step">
              <i className="bi bi-person-check step-icon"></i>
              <h4>View Profiles</h4>
              <p>Check detailed doctor profiles with expertise, experience, and ratings.</p>
            </div>
            <div className="step">
              <i className="bi bi-calendar-check step-icon"></i>
              <h4>Book Appointment</h4>
              <p>Schedule an appointment instantly with real-time availability.</p>
            </div>
            <div className="step">
              <i className="bi bi-chat-dots step-icon"></i>
              <h4>Consult Easily</h4>
              <p>Connect with your doctor online or offline — hassle free.</p>
            </div>
          </div>
        </div>
      </div>
</>
}

export default HeroSection;
