import React from "react";
import { Link, Outlet } from "react-router-dom";


const NavigationTest = () => {
    return (
        <nav>
            <h1>Navigation Page</h1>
            <ul>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </ul>
            <Outlet />
       
        </nav>

       <ul>
           <li><a href={abc}>Link 1</a></li>
           <li><a href={abc}>Link 2</a></li>
           <li><a href={abc}>Link 3</a></li>
           <li><a href={abc}>Link 4</a></li>
           <li><a href={abc}>Link 5</a></li>
       </ul>

    );
};

export default NavigationTest;
