import React from "react";
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
export default function Navbar() {
    return (
        <header>
            <div className="logo-cont">
                <NavLink to="/">
                    <img src={logo} alt="logo" />
                    <h1>DynoWrite</h1>
                </NavLink>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/signup">Sign up</NavLink>
                    </li>
                    <li>Features</li>
                    <li>Reviews</li>
                    <li>Pricing</li>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
