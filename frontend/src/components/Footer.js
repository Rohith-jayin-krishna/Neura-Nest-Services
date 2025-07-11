// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Make sure this CSS file exists

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>NeuraNest Smart Home Solutions</h3>

        <div className="footer-contact">
          <p>
            📧 <a href="mailto:neuranestsmarthomesolutions@gmail.com">neuranestsmarthomesolutions@gmail.com</a>
          </p>
          <p>
            📞 <a href="tel:+919633578555">+91 96335 78555</a>
          </p>
          <p>
            📸 <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </p>
        </div>

        <p className="footer-bottom">© {new Date().getFullYear()} NeuraNest. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;