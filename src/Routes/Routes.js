import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Form from "../Pages/Form/Form";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Form} />
      </Switch>
    );
  }
}

export default Routes;
