import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardActions,
  CardBody,
} from "@progress/kendo-react-layout";
import { url } from "../../Config/config";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getData(this.props.match.params.id);
    }
  }

  getData = async (userId) => {
    try {
      const response = await Axios.get(`${url}/users/${userId}`);
      if (response.data.id) {
        this.setState({ data: response.data });
      }
    } catch (error) {
      console.clear();
    }
  };

  handleLogout = () => {
    const data = { id: null, isLogin: false };
    localStorage.setItem("data", JSON.stringify(data));
    this.props.history.push("/login");
  };

  render() {
    const { data } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 10,
        }}
      >
        <Card
          style={{
            width: "auto",
            boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
            marginTop: "15px",
            padding: 10,
          }}
        >
          <CardHeader
            className="k-hbox"
            style={{
              background: "transparent",
            }}
          >
            <CardTitle
              style={{
                fontWeight: "bold",
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
              }}
            >
              {data.fullName}
            </CardTitle>

            <Button primary={true} onClick={() => this.handleLogout()}>
              Logout
            </Button>
          </CardHeader>
          <CardBody>
            <div>
              <b>Username</b>:{data.username}
            </div>
            <div>
              <b>Email Address : </b>
              {data.email}
            </div>
            <div>
              <b>Gender:</b>
              {data.gender}
            </div>
            <div>
              <b>Mobile Number:</b>
              {data.mobileNumber}
            </div>
            <div>
              <b>Date Of Birth:</b>
              {new Date(data.dob).getFullYear() +
                "-" +
                new Date(data.dob).getMonth() +
                "-" +
                new Date(data.dob).getDate()}
            </div>
          </CardBody>
          <CardActions
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <b> UserId:</b> {data.id}
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withRouter(UserDetails);
