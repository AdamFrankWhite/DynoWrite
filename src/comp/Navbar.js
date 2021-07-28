import React from "react";
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout, createDoc, getDocuments } from "../redux/actions/userActions";
import userEvent from "@testing-library/user-event";
function Navbar(props) {
    return (
        <header>
            <div className="logo-cont">
                <NavLink to="/">
                    <img src={logo} alt="logo" />
                    <h1>DynoWrite</h1>
                </NavLink>
            </div>
            <nav>
                {/* Authenticated Navbar */}
                {props.user.authenticated && (
                    <ul>
                        <li>
                            <NavLink
                                to="/editor"
                                onClick={() =>
                                    props.createDoc(props.user.email)
                                }
                            >
                                Create
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/my-docs"
                                onClick={() =>
                                    props.getDocuments(props.user.email)
                                }
                            >
                                My Docs
                            </NavLink>
                        </li>
                        <li>Settings</li>
                        <li>
                            <NavLink to="/" onClick={() => props.logout()}>
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                )}

                {/* Unauthenticated Navbar */}
                {!props.user.authenticated && (
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
                )}
            </nav>
        </header>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    logout,
    createDoc,
    getDocuments,
};

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
