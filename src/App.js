import Editor from "./comp/Editor";
import Navbar from "./comp/Navbar";
import Home from "./comp/Home";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Home />
            {/* <Editor /> */}
        </div>
    );
}

export default App;
