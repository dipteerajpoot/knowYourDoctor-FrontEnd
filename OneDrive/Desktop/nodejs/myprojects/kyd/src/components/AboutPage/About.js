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
                    <h2>Who We Are</h2>
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
        </div>
        <Footer/>
    </>
}

export default About;
