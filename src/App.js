import Editor from "./comp/Editor";
import Navbar from "./comp/Navbar";
import Home from "./comp/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyDocs from "./pages/MyDocs.js";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
    withRouter,
} from "react-router-dom";
function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path={"/"} component={Home} />
                    <Route path={"/my-docs"} component={MyDocs} />
                    <Route path={"/dashboard"} component={Dashboard} />
                    <Route path={"/editor"} component={Editor} />
                    <Route path={"/login"} component={Login} />
                    <Route path={"/signup"} component={Signup} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
