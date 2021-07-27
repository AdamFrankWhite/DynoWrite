import React, { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        props.loginUser({ email, password }, props.history);
    };
    return (
        <section className="login-cont">
            <form onSubmit={(e) => handleSubmit(e)}>
                <i
                    class="fas fa-key"
                    style={{
                        padding: "0.5em",
                        border: "1px solid black",
                        borderRadius: "25px",
                        margin: "auto",
                    }}
                ></i>
                <h2>Login</h2>
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
                <input type="submit" value="Sign in" />
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
    loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
