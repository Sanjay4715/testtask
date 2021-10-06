import React, { Component } from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

import {
  FormInput,
  FormMaskedTextBox,
} from "../../Component/FormComponents/InputComponents";
import {
  nameValidator,
  mobileValidator,
  emailValidator,
} from "../../Component/FormComponents/ValidatorComponents";

class CustomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleSubmit = (dataItem) => alert(JSON.stringify(dataItem, null, 2));

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        render={(formRenderProps) => (
          <FormElement
            style={{
              width: "auto",
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 10,
            }}
          >
            <Field
              id="fullName"
              name="fullName"
              label="Full Name"
              component={FormInput}
              validator={nameValidator}
            />
            <Field
              id={"mobileNumber"}
              name={"mobileNumber"}
              label={"Mobile Number"}
              mask={"0000-000000"}
              hint={"Hint: Your active mobile number."}
              component={FormMaskedTextBox}
              validator={mobileValidator}
            />

            <Field
              id="email"
              name="email"
              label="Email Address"
              hint="Hint: Enter your personal email address."
              type="email"
              component={FormInput}
              validator={emailValidator}
            />
            <Field
              id="username"
              name="username"
              label="Username"
              type="username"
              component={FormInput}
              validator={nameValidator}
            />
            <Field
              id="password"
              name="password"
              label="Password"
              type="password"
              component={FormInput}
              validator={nameValidator}
            />
            <Field
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              component={FormInput}
              validator={nameValidator}
            />
            <br />
            <Button primary={true} type="submit">
              Submit
            </Button>
          </FormElement>
        )}
      />
    );
  }
}

export default CustomForm;
