import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./HomePageCard.css";

class HomePageCard extends React.Component {
  constructor(props) {
    super(props);
    this.info = props.info;
  }
  render() {
    const cardTitle = this.info.cardTitle;
    const cardText = this.info.cardText;
    const buttonText = this.info.buttonText;
    const color = this.info.color;
    const disabledButton = this.info.disabled;
    const href = this.info.href;
    return (
      <div className="homepagecard">
        <Card
          border={color.toLowerCase()}
          style={{ width: "80%" }}
          className="h-90 shadow-sm rounded overlay"
        >
          <Card.Body>
            <Card.Title> {cardTitle} </Card.Title>
            <Card.Text>{cardText}</Card.Text>
            {(buttonText !== "" && !disabledButton) && (
              <Button variant="outline-primary" className="mr-auto" href={href}>
                {buttonText}
              </Button>
            )}
            
            {(buttonText !== "" && disabledButton) && (
              <Button variant="outline-primary" className="mr-auto" disabled href={href}>
                Signin to Go
              </Button>
            )} 
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default HomePageCard;
