import React from "react";
import fire from '../../../assets/fire.png';
import star from '../../../assets/glowing-star.png';
import party from '../../../assets/party.png';
import '../NavBar/navbar.css';

const Navbar = () => {
  return (
   <nav className="navbar">
        <h1>MovieManiac</h1>    
        <div className="navbar_links"> {/*EMMATS*/}
          <a href="">Popular <img src={fire} alt="Fire" className="navbar_icon" /></a>
          <a href="/about">Top Rated <img src={star} alt="Star" className="navbar_icon" /></a>
          <a href="/contact">Contact <img src={party} alt="Party" className="navbar_icon" /></a>
        </div>
        
      </nav>
  );
};

export default Navbar;
