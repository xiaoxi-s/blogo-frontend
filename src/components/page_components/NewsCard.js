import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card, Button } from "react-bootstrap";
import parse from 'html-react-parser'

import "./NewsCard.css";

class NewsCard extends React.Component {
  render() {
    return (
      <div className="newscard">
        <Card
          style={{ width: "78%" }}
          className="h-100 shadow-sm bg-white rounded"
        >
          <Card.Body>
            <Card.Title> {this.props.news.title} </Card.Title>
            <Card.Text>
                {parse(this.props.news.description)}
            </Card.Text>
            <Button href={this.props.news.url}>View Details</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default NewsCard;
