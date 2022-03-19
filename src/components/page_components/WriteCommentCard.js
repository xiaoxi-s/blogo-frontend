import React from "react";

import { Card, Button, Form } from "react-bootstrap";
import "./WriteCommentCard.css";

class WriteCommentCard extends React.Component {
  constructor(props) {
    super(props);
    this.info = props.info;
    this.state = {
      commentToID: "",
      commentContent: "",
    };
  }

  render() {
    const submitCallback = () => {
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
          commentToID: this.info.postID,
          username: this.info.username,
          commentContent: this.state.commentContent,
        }),
      };

      fetch(
        process.env.REACT_APP_REQUEST_URI + "/comments/" + this.info.postID,
        requestOptions
      )
        .then((response) => response.json())
        .then((responseJSON) => {
          if (responseJSON.error !== undefined) {
            throw "comment failed";
          } else {
            this.setState({
              commentToID: responseJSON.commentToID,
            }, () => window.location.reload(true));
          }
        }).catch((e) => console.log(e))
    };
    return (
      <div className="writecommentarea">
        <div className="writecommentcard">
          {!this.state.navigate && (
            <Card
              style={{ width: "70%" }}
              className="h-100 shadow-sm bg-white rounded"
            >
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="postContent.Input">
                    <Form.Label>Show your wonderful reflections</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      onChange={(e) =>
                        this.setState({ commentContent: e.target.value })
                      }
                    />
                  </Form.Group>
                </Form>
                <Button
                  variant="outline-primary"
                  className="mr-auto"
                  onClick={submitCallback}
                  disabled={!this.info.signin}
                >
                  Submit
                </Button>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    );
  }
}

export default WriteCommentCard;
