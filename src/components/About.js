import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About iNotebook</h1>
      <p>
        Welcome to iNotebook, your personal notebook in the cloud. Your notes are securely stored and accessible from anywhere.
        Never lose track of your thoughts and ideas again.
      </p>
      {!localStorage.getItem('token') ?
        <Link to="/signup" className="get-started-button">
          Get Started
        </Link>
        : ""}
    </div >
  );
};

export default About;
