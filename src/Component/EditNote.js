import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateTimePicker from "react-datetime-picker";
import AxiosCall from "./AxiosCall";
import t from "./locale";

class EditNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteId: props.noteId,
      note: props.note,
      modified: "",
      notificationTime: props.notificationTime,
      priority: props.priority,
      show: false
    };
  }

  onChangeDate = date =>
    this.setState({
      notificationTime: date
    });

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onClick = nr => () => {
    this.getDate();
    this.setState({
      priority: nr
    });
  };

  getDate = () => {
    var modified = new Date();
    var modified =
      modified.getFullYear() +
      "-" +
      (modified.getMonth() + 1) +
      "-" +
      modified.getDate() +
      " " +
      modified.getHours() +
      ":" +
      modified.getMinutes() +
      ":" +
      modified.getSeconds();
    this.setState({ modified });
  };

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      noteId: this.state.noteId,
      modified: this.state.modified,
      note: this.state.note,
      notificationTime: this.state.notificationTime,
      priority: this.state.priority
    };

    AxiosCall.EditNote(user)
      .then(response => {
        if (response.status === 200) {
          console.log("Updated Successfully!");
          return;
        }
        throw new Error("Network response was not ok!");
      })
      .then(window.location.reload(true))
      .catch(e => {
        console.log(e);
      });
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <div>
        <Button
          variant="light"
          className="btn btn-outline-primary mr-1"
          onClick={this.handleShow}
        >
          {t("edit")}
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Note:</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  value={this.state.note}
                  name="note"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <label>
                Notification Time:
                <DateTimePicker
                  name="notificationTime"
                  onChange={this.onChangeDate}
                  value={this.state.notificationTime}
                />
              </label>

              <fieldset>
                <Form.Group as={Row}>
                  <Form.Label as="legend" column sm={2}>
                    Priority:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      id="priorityHigh"
                      type="radio"
                      label="High"
                      name="priority"
                      onClick={this.onClick(1)}
                    />
                    <Form.Check
                      id="priorityMedium"
                      type="radio"
                      label="Medium"
                      name="priority"
                      onClick={this.onClick(2)}
                    />
                    <Form.Check
                      id="priorityLow"
                      type="radio"
                      label="Low"
                      name="priority"
                      onClick={this.onClick(3)}
                    />
                  </Col>
                </Form.Group>
              </fieldset>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={(this.handleClose, this.handleSubmit)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditNote;
