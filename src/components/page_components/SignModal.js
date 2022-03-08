import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitButtonCallback = props.submitButtonCallback;
    this.closeButtonCallback = props.closeButtonCallback;
    this.state = {
      username: "",
      password: "",
      signupFailInfo: "",
    };
  }

  componentDidMount() {
    this.submitForSignupVerification =
      this.submitForSignupVerification.bind(this);
  }

  submitForSignupVerification() {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    };
    console.log(this.state.username + this.state.password);
    var responseJSON = fetch(
      "http://localhost:8080/signup",
      requestOptions
    ).then((response) => {
      return response.json();
    });
    console.log(responseJSON);
    if (responseJSON.has("error")) {
      this.setState({ signupFailInfo: responseJSON.get("error") });
      console.log("Sign up failed");
    } else {
      this.submitButtonCallback(responseJSON);
      console.log("Sign up success");
    }
  }

  render() {
    const submitForSignupVerification = this.submitForSignupVerification;
    return (
      <Form>
        <Form.Text>{this.state.signinFailInfo}</Form.Text>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="username"
            onChange={(e) => this.setState({ username: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            submitForSignupVerification();
          }}
        >
          Submit
        </Button>
      </Form>
    );
  }
}

class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitButtonCallback = props.submitButtonCallback;
    this.closeButtonCallback = props.closeButtonCallback;
    this.state = {
      username: "",
      password: "",
      signinFailInfo: "",
    };
  }

  componentDidMount() {
    this.submitForSigninVerification =
      this.submitForSigninVerification.bind(this);
  }

  submitForSigninVerification() {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    };
    var responseJSON = fetch(
      "http://localhost:8080/signin",
      requestOptions
    ).then((response) => {
      return response.json();
    });
    console.log(responseJSON);
    if (responseJSON.has("error")) {
      this.setState({ signinFailInfo: responseJSON.get("error") });
      console.log("Sign in failed");
    } else {
      this.submitButtonCallback(responseJSON);
      console.log("Sign in success");
    }
  }

  render() {
    const submitForSignVerification = this.submitForSignVerification;
    return (
      <Form>
        <Form.Text>{this.state.signinFailInfo}</Form.Text>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="username"
            onChange={(e) => this.setState({ username: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            submitForSignVerification();
          }}
        >
          Submit
        </Button>
      </Form>
    );
  }
}

class SignModal extends React.Component {
  constructor(props) {
    super(props);
    this.signMethod = props.signMethod;
    this.showSignModalType = props.showSignModalType;
    this.submitSignButtonCallback = props.submitSignButtonCallback;
    this.closeSignButtonCallback = props.closeSignButtonCallback;
  }

  render() {
    const showSignModalType = this.showSignModalType;
    const submitSignButtonCallback = this.submitSignButtonCallback;
    const closeSignButtonCallback = this.closeSignButtonCallback;
    return (
      <div>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={true}
          onHide={closeSignButtonCallback}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {showSignModalType === "signin" && "Sign in"}
              {showSignModalType === "signup" && "Sign up"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showSignModalType === "signin" && (
              <SigninForm
                submitButtonCallback={submitSignButtonCallback}
                closeButtonCallback={closeSignButtonCallback}
              ></SigninForm>
            )}
            {showSignModalType === "signup" && (
              <SignupForm
                submitButtonCallback={submitSignButtonCallback}
                closeButtonCallback={closeSignButtonCallback}
              ></SignupForm>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => closeSignButtonCallback()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default SignModal;
