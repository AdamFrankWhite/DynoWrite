import React from "react";
import logo from "../assets/images/logo.png";
export default function Navbar() {
    return (
        <header>
            <div className="logo-cont">
                <img src={logo} alt="logo" />
                <h1>DynoWrite</h1>
            </div>
            <nav>
                <ul>
                    <li>Sign up</li>
                    <li>Features</li>
                    <li>Reviews</li>
                    <li>Pricing</li>
                    <li>Login</li>
                </ul>
            </nav>
        </header>
    );
}
