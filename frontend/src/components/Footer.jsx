import React from "react";
import "../style/footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at
            leo gravida, bibendum libero id, ultricies libero. Aliquam vel sem
            id lectus ultrices eleifend in eu metus.
          </p>
        </div>
        <div className="footer-section">
          <h3>Customer Care</h3>
          <br />
          <ul>
            <li className="contact-link">
              <a href="#">FAQ</a>
            </li>
            <li className="contact-link">
              <a href="#">Shipping &amp; Returns</a>
            </li>
            <li className="contact-link">
              <a href="#">Privacy Policy</a>
            </li>
            <li className="contact-link">
              <a href="#">Terms &amp; Conditions</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Reach Us </h3>
          <br />
          <ul>
            <li className="contact-link">Email: abcd@gmail.com</li>
            <li className="contact-link">Phone: 6876708707</li>
            <li className="contact-link">
              Address: 751024 KIIT Rd,Bhubaneswar Odisha
            </li>
          </ul>
        </div>
      </div>
      <div className="Copyright">
        <p>Copyright ⓒ {currentYear}</p>
      </div>
    </footer>
  );
}

export default Footer;
