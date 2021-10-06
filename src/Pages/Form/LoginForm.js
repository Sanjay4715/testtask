import React, { Component } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { Label, Error, Hint } from "@progress/kendo-react-labels";
import Axios from "axios";
import { url } from "../../Config/config";
import { withRouter } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: "",
        password: "",
      },
      error: {
        usernameError: "",
        passwordError: "",
      },
    };
  }

  handleChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  checkError = (username, password) => {
    let usernameError = username ? username : "";
    let passwordError = password ? password : "";

    if (this.state.data.username.length < 5) {
      usernameError = "Username must be of length 5 or more";
    }

    if (this.state.data.password.length < 7) {
      passwordError = "Password must be of length 7 or more";
    }
    if (passwordError || usernameError) {
      this.setState({
        error: {
          passwordError,
          usernameError,
        },
      });
      return true;
    } else {
      this.setState({
        error: {
          passwordError: "",
          usernameError: "",
        },
      });
      return false;
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let errorStatus = this.checkError();
    if (errorStatus === false) {
      const response = await Axios.get(`${url}/users`, {
        params: { username: this.state.data.username },
      });
      if (response.data.length !== 0) {
        if (
          this.state.data.password === response.data[0].password &&
          this.state.data.username === response.data[0].username
        ) {
          const data = { id: response.data[0].id, isLogin: true };
          this.props.history.push(`/user/${data.id}`);
          localStorage.setItem("data", JSON.stringify(data));
        } else {
          this.checkError("", "Password doesnot matched");
        }
      } else {
        this.checkError("Username doesnot exists", "");
      }
    }
  };

  handleSignup = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div style={{ padding: 10 }}>
        <Label style={{ fontSize: 24 }}>Welcome to the System</Label>
        <form
          onSubmit={this.handleSubmit}
          style={{
            paddingTop: 15,
            paddingBottom: 10,
            border: `2px solid #181818`,
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{ width: "50%", display: "flex", flexDirection: "column" }}
          >
            <Label
              editorValid={this.state.error.usernameError !== "" ? false : true}
              style={{ fontSize: 18 }}
            >
              Username
            </Label>
            <Input
              type="username"
              id="username"
              name="username"
              required
              valid={this.state.error.usernameError !== "" ? false : true}
              disabled={false}
              ariaDescribedBy={`username ${this.state.error.usernameError}`}
              style={{
                width: "100%",
                height: 40,
                borderWidth: 2,
                borderRadius: 5,
                fontSize: 14,
              }}
              onChange={this.handleChange}
              value={this.state.data.username}
            />
            <div>
              {this.state.error.usernameError ? (
                <Error id={this.state.error.usernameError}>
                  {this.state.error.usernameError}
                </Error>
              ) : (
                <Hint id="email">
                  Username must contain one uppercase, one digit and one special
                  character
                </Hint>
              )}
            </div>
          </div>
          <br />

          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Label
              editorValid={this.state.error.passwordError !== "" ? false : true}
              style={{ fontSize: 18 }}
            >
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              required
              valid={this.state.error.passwordError !== "" ? false : true}
              disabled={false}
              ariaDescribedBy={`password ${this.state.error.passwordError}`}
              style={{
                width: "100%",
                height: 40,
                borderWidth: 2,
                borderRadius: 5,
                fontSize: 14,
              }}
              onChange={this.handleChange}
              value={this.state.data.password}
            />
            <div>
              {this.state.error.passwordError ? (
                <Error id={this.state.error.passwordError}>
                  {this.state.error.passwordError}
                </Error>
              ) : (
                <Hint id="email">
                  Password must contain one uppercase, one digit and one special
                  character
                </Hint>
              )}
            </div>
            <br />
          </div>

          <br />
          <Button type="submit" primary={true}>
            Submit
          </Button>
          <a href="/">Create Account</a>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
