import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav, Container, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

class BlogNavbar extends React.Component {
  constructor(props) {
    super(props)

    this.signin = props.signin

    this.myStorage = props.myStorage
    this.showSignModalCallback = props.showSignModalCallback
    this.appSignoutCallback = props.appSignOutCallback
  }

  render() {
    const signin = this.signin
    const signOutCallback = () => {
      this.signin = false
      this.appSignoutCallback()
    }
    const showSignModalCallback = this.showSignModalCallback;
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/home">Blogo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/posts">
                Posts
              </Nav.Link>
              <Nav.Link as={NavLink} to="/daily">
                Daily
              </Nav.Link>
              <Nav.Link as={NavLink} to="/categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about">
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {!signin && (
            <Button
              onClick={() => {
                showSignModalCallback("signin");
              }}
              className="mr-auto"
              size="sm"
            >
              Signin
            </Button>
          )}
          {!signin && (
            <Button
              onClick={() => {
                showSignModalCallback("signup");
              }}
              className="mr-auto"
              size="sm"
            >
              Signup
            </Button>
          )}
          {signin && <Link to="/home" onClick={signOutCallback}>Sign Out</Link>}
        </Container>
      </Navbar>
    );
  }
}

export default BlogNavbar;
