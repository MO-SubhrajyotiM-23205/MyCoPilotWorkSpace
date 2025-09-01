import React from "react";
import { Link } from "react-router-dom";
import fire from '../../../assets/fire.png';
import star from '../../../assets/glowing-star.png';
import party from '../../../assets/party.png';
import '../NavBar/navbar.css';

const Navbar = () => {
  return (
   <nav className="navbar">
        <h1>MovieManiac</h1>    
        <div className="navbar_links"> {/*EMMATS*/}
          <Link to="/movielist">Popular <img src={fire} alt="Fire" className="navbar_icon" /></Link>
          <Link to="/about">Top Rated <img src={star} alt="Star" className="navbar_icon" /></Link>
          <Link to="/contact">Contact <img src={party} alt="Party" className="navbar_icon" /></Link>
          <Link to="/apitest">API Test</Link>
        </div>
        
      </nav>
  );
};

export default Navbar;
