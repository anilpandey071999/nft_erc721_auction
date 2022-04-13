import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Install from "./install";
import { ethers } from "ethers";
// import { LinkContainer } from "react-router-bootstrap";
// import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// ReactDOM.render(
//   <React.StrictMode>
//        <Router>
//       <Routes>
//         <Route exact path="/" component={Install} />
//         {/* <Route path="/service" component={Service} />
//         <Route path="/about" component={About} /> */}

//       </Routes>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const Navbars = () => {
  const [account, setaccount] = useState("");

  useEffect(() => {
    connectWallet();
  });
  const connectWallet = async () => {
    const [accounts] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setaccount(accounts);
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/Install">ERC721 Market Place</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/AddNFT">AddNFT</Link>
              </Nav.Link>
            </Nav>
            <label>{account}</label>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbars;
