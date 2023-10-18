import React, { useState, useEffect } from "react";
import "./Footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import namesData from "./namesData";
import { Link } from 'react-router-dom';

const Footer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showName, setShowName] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowName(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % namesData.length);
        setShowName(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const year = new Date().getFullYear();
  const currentPerson = namesData[currentIndex];

  return (
    <footer className="footer">
      <div className="container mx-auto">
        <div className="footer-content">
          <div className="footer-links">
            <Link to="/" className="footer-link" onClick={scrollToTop}>
              Inicio
            </Link>
            <Link to="/encuestas" className="footer-link" onClick={scrollToTop}>
              Encuestas
            </Link>
            <a href="https://daniels35.com/" target="_blank" className="footer-link" onClick={scrollToTop}>
              Contacto
            </a>
          </div>
          <div className="name-container">
            Made with ❤️ by{""}
            <span
              className={`name-animation-footer name-fixed-width-footer ${
                showName ? "show" : ""
              }`}
            >
              {currentPerson.name}
            </span>
          </div>
          <div className={`social-icons-footer ${showName ? "show" : ""}`}>
            <a
              href={`https://github.com/${currentPerson.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaGithub className="github-icon-footer" />
            </a>
            <a
              href={currentPerson.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaLinkedin className="linkedin-icon-footer" />
            </a>
          </div>
          <p className="mt-2"><strong>Firplak © {year}</strong></p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
