import React from "react";
import { Card, Button } from "react-bootstrap";
import "./Comment.css";
import { BsHandThumbsUp } from "react-icons/bs";

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.info = props.info
    this.comment = this.info.comment
    this.signin = this.info.signin
  }
  render() {
    return (
      <div className="commentcard">
        <Card
          style={{ width: "62%" }}
          className="h-100 shadow-sm bg-white rounded"
        >
          <Card.Body>
            <Card.Title> {this.info.comment.username} </Card.Title>
            <Card.Text>{this.info.comment.commentContent}</Card.Text>
            <Button variant="outline-primary" disabled={!this.signin}>
              <BsHandThumbsUp></BsHandThumbsUp>
              {this.info.comment.numOfThumb}
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Comments;
