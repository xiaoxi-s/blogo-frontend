import React from "react";
import { Card, Button } from "react-bootstrap";
import "./Comment.css";
import { BsHandThumbsUp } from "react-icons/bs";

class Comments extends React.Component {
  render() {
    return (
      <div className="postcard">
        <Card
          style={{ width: "60%" }}
          className="h-100 shadow-sm bg-white rounded"
        >
          <Card.Body>
            <Card.Title> {this.props.comment.username} </Card.Title>
            <Card.Text>{this.props.comment.commentContent}</Card.Text>
            <Button variant="outline-primary">
              <BsHandThumbsUp></BsHandThumbsUp>
              {this.props.comment.numOfThumb}
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Comments;
