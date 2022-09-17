import axios from "axios";
// const API_URL = "http://localhost:9090/demorest/webapi/notes";

class AxiosCall {
  AddNote(user) {
    return axios.post(
      "http://localhost:9090/demorest/webapi/notes/note/add",
      user
    );
  }
  EditNote(user) {
    return axios.put(
      "http://localhost:9090/demorest/webapi/notes/note/modify",
      user
    );
  }
  MarkComplete(user) {
    return axios.put(
      "http://localhost:9090/demorest/webapi/notes/note/complete",
      user
    );
  }
  DeleteNote(user) {
    return axios.put(
      "http://localhost:9090/demorest/webapi/notes/note/delete",
      user
    );
  }
}
export default new AxiosCall();
