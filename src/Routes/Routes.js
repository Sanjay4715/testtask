import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Form from "../Pages/Form/Form";
import LoginForm from "../Pages/Form/LoginForm";
import UserDetails from "../Pages/UserDetails/UserDetails";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Form} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/user/:id" exact component={UserDetails} />
      </Switch>
    );
  }
}

export default Routes;
