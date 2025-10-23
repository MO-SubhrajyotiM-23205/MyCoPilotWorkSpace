import React from "react";
import { NavLink } from "react-router-dom";
import fire from '../../../assets/fire.png';
import star from '../../../assets/glowing-star.png';
import party from '../../../assets/party.png';
import '../NavBar/navbar.css';

const Navbar = () => {
  return (
   <nav className="navbar">
        <h1>MovieManiac</h1>    
        <div className="navbar_links"> {/*EMMATS*/}
          <NavLink to="/movielist">Popular <img src={fire} alt="Fire" className="navbar_icon" /></NavLink>
          <NavLink to="/about">Top Rated <img src={star} alt="Star" className="navbar_icon" /></NavLink>
          <NavLink to="/contact">Contact <img src={party} alt="Party" className="navbar_icon" /></NavLink>
          <NavLink to="/apitest">API Test</NavLink>
          <NavLink to="/apicallthroughusedata">API By useData</NavLink>
          <NavLink to="/axioscalling">Axios Test</NavLink>
          <NavLink to="/dbbindlist">DB Bind List</NavLink>
          <NavLink to="/checkuserefhook">useRef</NavLink>
          <NavLink to="/checkreackformhook">HookForm</NavLink>
          <NavLink to="/gridfunction">Grid Function</NavLink>
        </div>
        
      </nav>
  );
};

export default Navbar;
