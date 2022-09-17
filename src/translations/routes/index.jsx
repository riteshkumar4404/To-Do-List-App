import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CompletedNote from "../../Component/CompletedNote";
import Home from "../../Component/Home";

//React Routing.
export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/completed" exact component={CompletedNote} />
    </Switch>
  </Router>
);
