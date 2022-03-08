import React from "react";

import { Container, Row } from "react-bootstrap";
import BlogNavbar from "./page_components/BlogNavbar";

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.info = props.info;
    this.state = {
      signin: this.info.signin,
      showSignModalType: this.info.showSignModalType,
      searchText: this.info.searschText,
      cookies: this.info.cookies,
    };
  }

  render() {
    const signinStatus = this.state.signin;
    const showSignModalTypeStatus = this.state.showSignModalType;

    const showSignModalCallback = (newSignModalType) => {
      this.setState({
        showSignModalType: newSignModalType,
      });
      this.info.appShowSignModalCallback();
    };
    return (
      <div>
        <Container>
          <Row>
            <BlogNavbar
              signin={signinStatus}
              showSignModalCallback={showSignModalCallback}
            ></BlogNavbar>
          </Row>
        </Container>

        <Container>
          <h3>Credits: </h3>
          <p> The website and backend functionality is developed wiht React (Nodejs) and Golang.</p>
          <h4>Images</h4>
          <ul>
            <li>  
              Default Post Images: <a href="https://www.pexels.com/">Pexels</a>
            </li>
            <li>
              Background image: <a href="https://wallup.net/">Wallup</a>
            </li>
          </ul>
          
        </Container>
      </div>
    );
  }
}

export default AboutPage;
