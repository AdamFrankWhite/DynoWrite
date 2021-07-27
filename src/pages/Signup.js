import React, { useState } from "react";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

function Signup(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password == confirmPassword) {
            console.log(email, password, confirmPassword);
            props.signupUser(
                { email, password, confirmPassword },
                props.history
            );
        }
    };
    return (
        <section className="login-cont">
            <form onSubmit={(e) => handleSubmit(e)}>
                <i
                    className="fas fa-user-plus"
                    style={{
                        padding: "0.5em",
                        border: "1px solid black",
                        borderRadius: "25px",
                        margin: "auto",
                    }}
                ></i>
                <h2>Register</h2>
                <hr />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <input type="submit" value="Sign up" />
            </form>
        </section>
    );
}

const mapStateToProps = function (state) {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    signupUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Signup);
