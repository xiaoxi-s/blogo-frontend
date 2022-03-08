import React from "react";

import { Container, Row } from "react-bootstrap";
import BlogNavbar from "./page_components/BlogNavbar";

class DailyPage extends React.Component {
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
      </div>
    );
  }
}

export default DailyPage;
