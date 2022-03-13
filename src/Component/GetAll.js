import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import EditNote from "./EditNote";
import { Form } from "react-bootstrap";
import AxiosCall from "./AxiosCall";
import t from "./locale";

class GetAll extends Component {
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

  handleDelete(Noteid) {
    const user = {
      activeNote: 0,
      noteId: Noteid,
      deleted: this.state.currentTime
    };

    AxiosCall.DeleteNote(user)
      .then(response => {
        if (response.ok) {
          console.log("Deleted Successfully!");
          return;
        }
        throw new Error("Network response was not ok!");
      })
      .then(window.location.reload(true))
      .catch(e => {
        console.log(e);
      });
  }

  handleComplete(Noteid) {
    this.getDate();

    const user = {
      completeStatus: 1,
      noteId: Noteid,
      completed: this.state.currentTime
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
    axios.get("http://localhost:9090/demorest/webapi/notes").then(res => {
      this.setState({ notes: res.data });
    });
  }

  render() {
    const handleClose = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });
    const { notes } = this.state;
    const allNotes = notes.map((note, index) => (
      <div
        key={index}
        className="card text-white bg-info mb-3"
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
            <EditNote
              noteId={note.noteId}
              note={note.note}
              notificationTime={note.notificationTime}
              priority={note.priority}
            />
            <Button
              variant="light"
              className="btn btn-outline-primary mr-1"
              onClick={() => {
                var result = window.confirm("Do you want to delete ?");
                if (result) {
                  this.handleDelete(note.noteId);
                }
              }}
            >
              {t("delete")}
            </Button>

            <Button
              variant="light"
              className="btn btn-outline-primary mr-1"
              onClick={() => {
                var result = window.confirm("Task will be marked completed ?");
                if (result) {
                  this.handleComplete(note.noteId);
                }
              }}
            >
              {t("markAsComplete")}
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
        <div style={{ margin: "auto", width: "50%", padding: "10px" }}>
          {notes.length > 0 ? allNotes : noNotes}
        </div>
      </div>
    );
  }
}

export default GetAll;
