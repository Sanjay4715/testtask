import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Label, Error, Hint } from "@progress/kendo-react-labels";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { v4 as uuidv4 } from "uuid";

import Axios from "axios";
import { url } from "../../Config/config";

class CustomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: uuidv4(),
        fullName: "",
        gender: "",
        dob: new Date(),
        email: "",
        mobileNumber: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      error: {
        fullNameError: "",
        emailError: "",
        mobileNumberError: "",
        usernameError: "",
        passwordError: "",
        confirmPasswordError: "",
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

  changeDate = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        dob: e.target.value,
      },
    });
  };

  checkError = (username) => {
    let usernameError = username ? username : "";
    let emailError = "";
    let mobileNumberError = "";
    let fullNameError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    const mobileRegex = new RegExp(/^9+\d{9}/); //must start with number 9 followed by 9 more digits
    const emailRegex = new RegExp(/\S+@\S+\.\S+/);

    if (this.state.data.fullName.length < 7) {
      fullNameError = "Full Name must at least 7 characters long";
    }

    if (emailRegex.test(this.state.data.email) === false) {
      emailError = "Email address is required";
    }

    if (mobileRegex.test(this.state.data.mobileNumber) === false) {
      mobileNumberError =
        "Mobile Number must start from 9--- and must have 10 digits";
    }

    if (this.state.data.username.length < 5) {
      usernameError = "Username must be of length 5 or more";
    } else if (this.state.data.username) {
      let checkChar = this.checkMissingCharacter(
        this.state.data.username.split("")
      );
      if (!checkChar.isExistUpper) {
        usernameError = "One Uppercase character is missing";
      }
      if (!checkChar.isExistLower) {
        usernameError = "One lowercase character is missing";
      }
      if (!checkChar.isExistNumber) {
        usernameError = "One Digit is missing";
      }
      if (!checkChar.isExistSpecial) {
        usernameError = "One Special Character is missing";
      }
    }

    if (this.state.data.password.length < 7) {
      passwordError = "Password must be of length 7 or more";
    } else if (this.state.data.password) {
      let checkChar = this.checkMissingCharacter(
        this.state.data.password.split("")
      );
      if (!checkChar.isExistUpper) {
        passwordError = "One Uppercase character is missing in password";
      }
      if (!checkChar.isExistLower) {
        passwordError = "One lowercase character is missing in password";
      }
      if (!checkChar.isExistNumber) {
        passwordError = "One Digit is missing in password";
      }
      if (!checkChar.isExistSpecial) {
        passwordError = "One Special Character is missing in password";
      }
    }

    if (this.state.data.confirmPassword.length < 7) {
      confirmPasswordError = "Password must be of length 7 or more";
    } else if (this.state.data.password !== this.state.data.confirmPassword) {
      confirmPasswordError = "Password must be matched";
    }

    if (
      fullNameError ||
      emailError ||
      mobileNumberError ||
      passwordError ||
      usernameError ||
      confirmPasswordError
    ) {
      this.setState({
        error: {
          fullNameError,
          emailError,
          mobileNumberError,
          passwordError,
          usernameError,
          confirmPasswordError,
        },
      });
      return true;
    } else {
      this.setState({
        error: {
          fullNameError: "",
          emailError: "",
          mobileNumberError: "",
          passwordError: "",
          usernameError: "",
          confirmPasswordError: "",
        },
      });
      return false;
    }
  };

  checkMissingCharacter = (data) => {
    const upperRegex = new RegExp(/[A-Z]/);
    const lowerRegex = new RegExp(/[a-z]/);
    const numRegex = new RegExp(/[0-9]/);
    const specialRegex = new RegExp(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\\/?~]/);

    let isExistUpper = data.some((val) => upperRegex.test(val));
    let isExistLower = data.some((val) => lowerRegex.test(val));
    let isExistNumber = data.some((val) => numRegex.test(val));
    let isExistSpecial = data.some((val) => specialRegex.test(val));
    return { isExistUpper, isExistLower, isExistNumber, isExistSpecial };
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isExistResponse = await Axios.get(`${url}/users`, {
        params: { username: this.state.data.username },
      });
      let errorStatus = "";
      if (isExistResponse.data.length !== 0) {
        errorStatus = this.checkError("Username already exists");
      } else {
        errorStatus = this.checkError();
        if (errorStatus === false) {
          const response = await Axios.post(`${url}/users`, this.state.data);
          if (response.data.id) {
            this.props.history.push("/login");
          }
        }
      }
    } catch (error) {
      console.clear();
    }
  };

  render() {
    return (
      <div style={{ padding: 10 }}>
        <Label style={{ fontSize: 24 }}>Fill the form</Label>
        <form
          onSubmit={this.handleSubmit}
          style={{
            paddingLeft: 35,
            paddingRight: 35,
            paddingTop: 15,
            paddingBottom: 10,
            border: `2px solid #181818`,
            borderRadius: 5,
          }}
        >
          <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <div
              style={{
                width: "59%",
                display: "flex",
                flexDirection: "column",
                marginRight: 10,
              }}
            >
              <Label
                editorValid={
                  this.state.error.fullNameError !== "" ? false : true
                }
                style={{ fontSize: 18 }}
              >
                Full Name
              </Label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter Full Name"
                required
                valid={this.state.error.fullNameError !== "" ? false : true}
                disabled={false}
                ariaDescribedBy={`fullName ${this.state.error.fullNameError}`}
                style={{
                  width: "100%",
                  height: 40,
                  borderWidth: 2,
                  borderRadius: 5,
                  fontSize: 14,
                }}
                onChange={this.handleChange}
                value={this.state.data.fullName}
              />
              <div>
                {this.state.error.fullNameError && (
                  <Error id={this.state.error.fullNameError}>
                    {this.state.error.fullNameError}
                  </Error>
                )}
              </div>
            </div>

            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
                marginRight: 10,
              }}
            >
              <Label style={{ fontSize: 18 }}>Gender</Label>
              <DropDownList
                id="gender"
                name="gender"
                required
                data={["Male", "Female", "Others"]}
                onChange={this.handleChange}
                style={{ width: "100%", height: 40 }}
              />
            </div>

            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <Label style={{ fontSize: 18 }}>Date Of Birth</Label>
              <DatePicker
                id="dob"
                name="dob"
                required
                value={this.state.data.dob}
                onChange={this.changeDate}
              />
            </div>
          </div>
          <br />

          <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <div
              style={{
                width: "49%",
                display: "flex",
                flexDirection: "column",
                marginRight: 10,
              }}
            >
              <Label
                editorValid={this.state.error.emailError !== "" ? false : true}
                style={{ fontSize: 18 }}
              >
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email address"
                required
                valid={this.state.error.fullNameError !== "" ? false : true}
                disabled={false}
                ariaDescribedBy={`email ${this.state.error.emailError}`}
                style={{
                  width: "100%",
                  height: 40,
                  borderWidth: 2,
                  borderRadius: 5,
                  fontSize: 14,
                }}
                onChange={this.handleChange}
                value={this.state.data.email}
              />
              <div>
                {this.state.error.emailError ? (
                  <Error id={this.state.error.emailError}>
                    {this.state.error.emailError}
                  </Error>
                ) : (
                  <Hint id="email">Something@something.com</Hint>
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
                editorValid={
                  this.state.error.mobileNumberError !== "" ? false : true
                }
                style={{ fontSize: 18 }}
              >
                Mobile Number
              </Label>
              <Input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Enter Personal Mobile Number"
                required
                valid={this.state.error.mobileNumberError !== "" ? false : true}
                disabled={false}
                ariaDescribedBy={`mobileNumber ${this.state.error.mobileNumberError}`}
                style={{
                  width: "100%",
                  height: 40,
                  borderWidth: 2,
                  borderRadius: 5,
                  fontSize: 14,
                }}
                onChange={this.handleChange}
                value={this.state.data.mobileNumber}
              />
              <div>
                {this.state.error.mobileNumberError && (
                  <Error id={this.state.error.mobileNumberError}>
                    {this.state.error.mobileNumberError}
                  </Error>
                )}
              </div>
            </div>
          </div>
          <br />

          <div style={{ display: "flex", flexDirection: "column" }}>
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

          <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <div
              style={{
                width: "49%",
                display: "flex",
                flexDirection: "column",
                marginRight: 10,
              }}
            >
              <Label
                editorValid={
                  this.state.error.passwordError !== "" ? false : true
                }
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
                placeholder="Confirm the password"
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
                    Password must contain one uppercase, one digit and one
                    special character
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
                editorValid={
                  this.state.error.confirmPasswordError !== "" ? false : true
                }
                style={{ fontSize: 18 }}
              >
                Confirm Password
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                valid={
                  this.state.error.confirmPasswordError !== "" ? false : true
                }
                disabled={false}
                ariaDescribedBy={`confirmPassword ${this.state.error.confirmPasswordError}`}
                style={{
                  width: "100%",
                  height: 40,
                  borderWidth: 2,
                  borderRadius: 5,
                  fontSize: 14,
                }}
                onChange={this.handleChange}
                value={this.state.data.confirmPassword}
              />
              <div>
                {this.state.error.confirmPasswordError ? (
                  <Error id={this.state.error.confirmPasswordError}>
                    {this.state.error.confirmPasswordError}
                  </Error>
                ) : (
                  <Hint id="email">
                    Password must contain one uppercase, one digit and one
                    special character
                  </Hint>
                )}
              </div>
            </div>
          </div>

          <br />
          <Button type="submit" primary={true}>
            Submit
          </Button>
          <a href="/login" style={{ marginLeft: 15 }}>
            Login
          </a>
        </form>
      </div>
    );
  }
}

export default withRouter(CustomForm);
