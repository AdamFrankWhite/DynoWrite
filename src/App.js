import Editor from "./comp/Editor";
import Navbar from "./comp/Navbar";
import Home from "./comp/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path={"/"} component={Home} />
                    <Route path={"/editor"} component={Editor} />
                    <Route path={"/login"} component={Login} />
                    <Route path={"/signup"} component={Signup} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
