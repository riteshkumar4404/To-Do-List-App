import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateTimePicker from "react-datetime-picker";
import AxiosCall from "./AxiosCall";
import t from "./locale";

class AddNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: "",
      activeNote: 0,
      addedTime: "",
      completeStatus: 0,
      notificationTime: "",
      priority: 0,
      show: false,
      date: new Date()
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
    var addedTime = new Date();
    var addedTime =
      addedTime.getFullYear() +
      "-" +
      (addedTime.getMonth() + 1) +
      "-" +
      addedTime.getDate() +
      " " +
      addedTime.getHours() +
      ":" +
      addedTime.getMinutes() +
      ":" +
      addedTime.getSeconds();
    this.setState({ addedTime });
  };

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      activeNote: 1,
      addedTime: this.state.addedTime,
      completeStatus: 0,
      note: this.state.note,
      notificationTime: this.state.notificationTime,
      priority: this.state.priority
    };

    AxiosCall.AddNote(user)
      .then(response => {
        if (response.status === 200) {
          console.log("Inserted Successfully!");
          return;
        }
        throw new Error("Network response was not ok!");
      })
      .then(window.location.reload(true))
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const handleClose = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });
    return (
      <div>
        <Button variant="primary" onClick={handleShow}>
          {t("addNote")}
        </Button>

        <Modal show={this.state.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formGroupNote">
                <Form.Label>Note:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Note"
                  name="note"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <label>
                Notification Time:
                <DateTimePicker
                  name="notificationTime"
                  onChange={this.onChangeDate}
                  value={this.state.date}
                />
              </label>

              <fieldset>
                <Form.Group as={Row}>
                  <Form.Label as="legend" column sm={2}>
                    Priority:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label="High"
                      name="priority"
                      id="formHorizontalRadios1"
                      onClick={this.onClick(1)}
                    />
                    <Form.Check
                      type="radio"
                      label="Medium"
                      name="priority"
                      id="formHorizontalRadios2"
                      onClick={this.onClick(2)}
                    />
                    <Form.Check
                      type="radio"
                      label="Low"
                      name="priority"
                      id="formHorizontalRadios3"
                      onClick={this.onClick(3)}
                    />
                  </Col>
                </Form.Group>
              </fieldset>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={(handleClose, this.handleSubmit)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddNote;
