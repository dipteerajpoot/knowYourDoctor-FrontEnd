import React from 'react';
import './footer.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Footer() {
    return <>
        <footer className="footer">
            <div className="main-container">

                <div className="first-section">
                    <img src="../assets/logo2.png" alt="Logo" />
                    <p className="footer-desc">
                        Know Your Doctor is created by Diptee Rajput to connect patients
                        with the right doctors — and doctors with each other — on one
                        unified platform.
                    </p>
                </div>

                <div className="second-section">
                    <h4>Contact Us</h4>
                    <p><i className="bi bi-telephone"></i> 123-456</p>
                    <p><i className="bi bi-envelope"></i> knowDoc@gmail.com</p>
                    <p><i className="bi bi-geo-alt"></i> Indore</p>
                </div>

                <div className="third-section">
                    <h4>Copy-right</h4>
                    <p><i className="bi bi-c-circle"></i> knowdoc123@.com</p>
                </div>
            </div>
        </footer>
    </>
}

export default Footer;
