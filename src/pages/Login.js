import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        axios
            .post("http://localhost:5000/login", {
                email,
                password,
            })
            .then((res) => {
                if (res.data.token) {
                    console.log(res.data.token);
                    history.push("/editor");
                }
            })
            .catch((err) => console.log(err));
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
