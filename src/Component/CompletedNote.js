import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import AxiosCall from "./AxiosCall";
import AddNote from "../Component/AddNote";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class CompletedNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      noteId: 0,
      currentTime: "",
      activeNote: 0,
      completed: ""
    };
  }

  getDate = () => {
    var currentTime = new Date();
    var currentTime =
      currentTime.getFullYear() +
      "-" +
      (currentTime.getMonth() + 1) +
      "-" +
      currentTime.getDate() +
      " " +
      currentTime.getHours() +
      ":" +
      currentTime.getMinutes() +
      ":" +
      currentTime.getSeconds();
    this.setState({ currentTime });
  };

  handleComplete(Noteid) {
    this.getDate();

    const user = {
      completeStatus: 0,
      noteId: Noteid,
      completed: null
    };

    AxiosCall.MarkComplete(user)
      .then(response => {
        if (response.ok) {
          console.log("Completed Successfully!");
          return;
        }
        throw new Error("Network response was not ok!");
      })
      .then(window.location.reload(true))
      .catch(e => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.getDate();
    axios
      .get("http://localhost:9090/demorest/webapi/notes/note/completed")
      .then(res => {
        this.setState({ notes: res.data });
      });
  }
  render() {
    const { notes } = this.state;
    const allNotes = notes.map((note, index) => (
      <div
        key={index}
        className="card text-white bg-secondary mb-3"
        style={{ margin: "30px", textAlign: "left", maxWidth: "40rem" }}
      >
        <div className="card-header">Note</div>
        <div className="card-body">
          <h4 className="card-title">Note {index + 1}</h4>
          <p className="card-text">
            {note.note}
            <br />
            Note Id: {note.noteId}
            <br />
            Notification time : {note.notificationTime}
          </p>

          <Form inline>
            <Button
              variant="light"
              className="btn btn-outline-primary mr-1"
              onClick={() => {
                var result = window.confirm(
                  "Task will be marked uncompleted ?"
                );
                if (result) {
                  this.handleComplete(note.noteId);
                }
              }}
            >
              Mark as uncomplete
            </Button>
          </Form>
        </div>
      </div>
    ));
    const noNotes = (
      <div>
        <h4>No notes available!</h4>
      </div>
    );
    return (
      <div>
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
          <div style={{ margin: "auto", width: "50%", padding: "10px" }}>
            {notes.length > 0 ? allNotes : noNotes}
          </div>
        </div>
      </div>
    );
  }
}

export default CompletedNote;
