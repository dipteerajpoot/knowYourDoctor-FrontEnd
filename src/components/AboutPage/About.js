import './About.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/footer';
function About() {
    return <>
    <Navbar/>
        <div className="about-page">
            <div className="hero-img">
                <img src="./assets/about.png" alt="Doctor" className="hero-img" />
                <div className="hero-text">
                    <h1>Your health. Your doctor. <br />One platform</h1>
                    <p>We're bridging the gap between care seekers and caregivers with trust,<br /> empathy, and technology.</p>
                </div>
            </div>

            <div className="content-section">
                <div className="about-us">
                    <h2><strong>Who We Are</strong></h2>
                    <p>
                        <strong>Know Your Doctor</strong> is a smart, modern healthcare platform founded by Diptee Rajput
                        with a vision to bridge the gap between patients and trusted medical professionals.
                    </p>
                    <p>
                        We empower patients to find verified doctors by city, specialization, or name, and enable doctors
                        to build professional profiles, share achievements, and connect with peers across the country.
                    </p>
                    <p>
                        Whether you're looking for expert care or expanding your medical network — <strong>Know Your Doctor</strong>
                        is where healthcare meets connection.
                    </p>
                </div>

                <div className="aboutUs-img">
                    <img src="./assets/aboutus.png" alt="Doctors" />
                </div>
            </div>
              {/* Our Solution Section */}
            <div className="solution-section">
                <h2>Our Solution</h2>
                <p>
                    We simplify healthcare access by providing an easy-to-use platform where patients can 
                    <strong> search, compare, and book appointments </strong> with verified doctors in just a few clicks.
                </p>
                <div className="solution-cards">
                    <div className="solution-card">
                        <i className="bi bi-search"></i>
                        <h3>Easy Search</h3>
                        <p>Find doctors by city, specialization, or name quickly.</p>
                    </div>
                    <div className="solution-card">
                        <i className="bi bi-shield-check"></i>
                        <h3>Verified Doctors</h3>
                        <p>We ensure only trusted and qualified doctors are listed.</p>
                    </div>
                    <div className="solution-card">
                        <i className="bi bi-calendar-check"></i>
                        <h3>Appointment Booking</h3>
                        <p>Book your consultation online without any hassle.</p>
                    </div>
                    <div className="solution-card">
                        <i className="bi bi-people"></i>
                        <h3>Doctor Networking</h3>
                        <p>Doctors can build profiles, share achievements, and connect.</p>
                    </div>
                </div>
            </div>

        </div>
        <Footer/>
    </>
}

export default About;
