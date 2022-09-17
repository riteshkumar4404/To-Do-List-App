import "../App.css";
import GetAll from "../Component/GetAll";
import AddNote from "../Component/AddNote";
import { Navbar, Nav, Form } from "react-bootstrap";

import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <h2>To DO List</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => (window.location.href = "/")}>
                Home
              </Nav.Link>
              <Nav.Link onClick={() => (window.location.href = "/completed")}>
                Completed Note
              </Nav.Link>
            </Nav>
            <Form inline>
              <AddNote />
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <GetAll />
      </div>
    );
  }
}

export default Home;
