import Install from "./components/install";
import Home from "./components/Home";
import Navbar from './components/NavBar';
import AddNFT from "./components/AddNFT";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  if (window.ethereum) {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/AddNFT" element={<AddNFT />}></Route>
        </Routes>
      </Router>
    );
  } else {
    return <Install />;
  }
}

export default App;
