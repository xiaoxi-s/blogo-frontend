import React from "react";

import { Container } from "react-bootstrap";

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.info = props.info;
    this.state = {};
  }

  render() {
    return (
      <div>
        <Container>
          <h3>Credits: </h3>
          <p>
            {" "}
            The website and backend functionality is developed wiht React
            (Nodejs) and Golang.
          </p>
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
