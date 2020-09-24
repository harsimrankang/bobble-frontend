import React, { Component } from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "./logo.jpg";
class App extends Component {
  state = {
    login: false,
    data: {},
  };
  responseFacebook = (response) => {
    console.log(response);
    let data = { response: response };
    if (response.accessToken) {
      console.setState({ login: true });
    } else {
      alert("facebook login error");
      data["login"] = false;
      console.setState({ login: false });
    }
  };
  validate = (fname, lname, email, password) => {
    if (fname == "" || lname == "" || email == "" || password == "") {
      alert("All blanks are compulsory");
      return false;
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      alert("You have entered an invalid email address!");
      return false;
    }

    return true;
  };
  signUp = () => {
    let fname = document.getElementById("inputFirstName").value;
    let lname = document.getElementById("inputLastName").value;
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;
    if (this.validate(fname, lname, email, password)) {
      axios
        .post("https://reqres.in/api/users", { fname: fname, lname: lname })
        .then((res) => {
          this.setState({ login: true, res: res });
          console.log(res);
        })
        .catch((error) => {
          alert("Error while Signing up");
          throw error;
        });
    }
  };
  login = (response) => {
    if (response.accessToken) {
      this.setState((state) => ({
        isLogined: true,
        accessToken: response.accessToken,
      }));
    }
  };
  handleLoginFailure = () => {
    alert("couldn't login with google");
  };
  render() {
    if (this.state.login) {
      alert("Logged In");
    }
    return (
      <div class="row mx-0">
        <div class="col-12 d-flex justify-content-center shadow">
          <img class="mx-auto" src={logo} />
        </div>
        <div class="container col-md-6 col-sm-8 mt-5 p-3 shadow-sm">
          <div class="font-weight-bold text-secondary text-center">SIGN UP</div>
          <div class="h3 font-weight-light text-secondary text-center">
            Create Your Account
          </div>
          <div class="text-secondary text-center">Lorem Ipsum</div>
          <div class="row col-12">
            <div class="col-6 pr-1">
              <div class="col-12 py-3 rounded btn" style={{ height: "62px" }}>
                Sign Up with Google
              </div>
            </div>
            <div class="col-6 pr-1">
              <FacebookLogin
                appId="966417477190521"
                autoLoad={true}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                callback={this.responseFacebook}
                icon="fa-facebook"
              />
            </div>
          </div>
          <div class="d-flex">
            <div
              class="flex-grow-1 border-bottom mx-1"
              style={{ height: "12px" }}
            ></div>
            <div class="bg-highlight">or</div>
            <div
              class="flex-grow-1 border-bottom mx-1"
              style={{ height: "12px" }}
            ></div>
          </div>
          <div className="col-12">
            <input
              type="text"
              class="form-control mt-2"
              id="inputFirstName"
              placeholder="First Name"
            ></input>
            <input
              type="text"
              class="form-control mt-2"
              id="inputLastName"
              placeholder="Last Name"
            ></input>
            <input
              type="email"
              class="form-control mt-2"
              id="inputEmail"
              placeholder="Enter email"
            ></input>
            <input
              type="password"
              class="form-control mt-2"
              id="inputPassword"
              placeholder="Password"
            ></input>
            <div className="text-secondary mt-2">
              By clicking Sign Up, you agree to our <a>Terms of Use</a> and our{" "}
              <Link>Privacy Policy</Link>
            </div>
            <div
              className="col-12 btn btn-primary shadow mt-4"
              onClick={() => {
                this.signUp();
              }}
            >
              Sign Up
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
