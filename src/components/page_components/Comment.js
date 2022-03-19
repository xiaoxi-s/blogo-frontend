import React from "react";
import { Card, Button } from "react-bootstrap";
import "./Comment.css";
import { BsHandThumbsUp } from "react-icons/bs";

class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.info = props.info
    this.comment = this.info.comment
    this.signin = this.info.signin
    this.username = this.info.username
    this.thumbuped = this.info.thumbuped
    this.thumbupButtonCallback = this.props.thumbupButtonCallback

    this.thumbupComment = this.thumbupComment.bind(this)
  }

  thumbupComment() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Credentials": true,
        "Access-Control-Request-Headers": [
          "Origin",
          "Content-Type",
          "Access-Control-Request-Credentials",
          "Cookie",
          "Access-Control-Request-Methods",
        ],
        "Access-Control-Request-Methods": ["POST"],
      },
      withCredentials: true,
      credentials: "include",
      body: JSON.stringify({
        username: this.username,
      }),
    };
    fetch(
      process.env.REACT_APP_REQUEST_URI + "/comments/thumbup/" + this.comment.commentID,
      requestOptions
    )
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON.error !== undefined) {
          throw "thumbup failed";
        } else {
          this.thumbupButtonCallback()
        }
      }).catch((e) => console.log(e))
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
            <Button variant="outline-primary" disabled={(!this.signin || this.thumbuped)} onClick={this.thumbupComment}>
              <BsHandThumbsUp></BsHandThumbsUp>
              {this.info.comment.numOfThumb}
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Comment;
