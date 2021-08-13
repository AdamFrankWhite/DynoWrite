import Document from "./pages/Document";
import Navbar from "./comp/Navbar";
import Home from "./comp/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyDocs from "./pages/MyDocs.js";
import Dashboard from "./pages/Dashboard";
import Trash from "./pages/Trash";
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
                    <Route path={"/editor"} component={Document} />
                    <Route path={"/login"} component={Login} />
                    <Route path={"/signup"} component={Signup} />
                    <Route path={"/trash"} component={Trash} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
