import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { WithContext as ReactTags } from "react-tag-input";
import "./WritePostCard.css";
import { Navigate } from "react-router-dom";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class WritePostCard extends React.Component {
  constructor(props) {
    super(props);
    this.info = props.info;
    this.state = {
      postTitle: "",
      postContent: "",
      postTags: [],
      postCategory: "",
      navigate: false,
      postID: "",
    };
  }

  render() {
    // set up a random image
    const hashForImages = function (cardTitle) {
      var h = 0,
        l = cardTitle.length,
        i = 0;
      if (l > 0)
        while (i < l) h = ((h << 5) - h + cardTitle.charCodeAt(i++)) | 0;
      return Math.abs(h);
    };
    const postImgSrc =
      "../img/pics/" + (hashForImages(this.state.postTitle) % 10) + ".jpg";
    const postTags = this.state.postTags;

    // callbacks for the tag input
    const handleDelete = (i) => {
      this.setState({
        postTags: this.state.postTags.filter((tag, index) => index !== i),
      });
    };

    const handleAddition = (tag) => {
      this.setState({
        postTags: [...this.state.postTags, tag],
      });
    };

    const handleDrag = (tag, currPos, newPos) => {
      const newTags = this.state.postTags.slice();

      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);

      this.setState({ postTags: newTags });
    };

    // callback for the post button
    const postCallback = () => {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Credentials": true,
          "Access-Control-Request-Headers": ["Origin", "Content-Type", "Access-Control-Request-Credentials", "Cookie", "Access-Control-Request-Methods"],
          "Access-Control-Request-Methods": ["POST"],
        },
        withCredentials: true,
        credentials: "include",
        body: JSON.stringify({
          postTitle: this.state.postTitle,
          postContent: this.state.postContent,
          postTags: this.state.postTags,
          postCategory: this.state.postCategory,
          username: this.info.username,
        }),
      };

      fetch(process.env.REACT_APP_REQUEST_URI + "/posts", requestOptions)
        .then((response) => response.json())
        .then((responseJSON) => {
          if (responseJSON.error !== undefined) {
            throw "post failed";
          } else {
            this.setState({
              postID: responseJSON.postID,
              navigate: true,
            });
          }
        });
    };

    return (
      <div className="writepostcard">
        {!this.state.navigate && (
          <Card
            style={{ width: "78%" }}
            className="h-100 shadow-sm bg-white rounded"
          >
            <Card.Img
              variant="top"
              src={postImgSrc}
              alt=""
              width={this.width}
              height={this.width * 0.2}
            />
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="postTitle.Input">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="title"
                    onChange={(e) =>
                      this.setState({ postTitle: e.target.value })
                    }
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="postTags.Input">
                      <Form.Label>Tags</Form.Label>
                      <ReactTags
                        maxLength={8}
                        tags={postTags}
                        delimiters={delimiters}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleDrag={handleDrag}
                        inputFieldPosition="bottom"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        as="select"
                        value={this.state.postCategory}
                        onChange={(e) => {
                          this.setState({ postCategory: e.target.value });
                        }}
                      >
                        <option value="Food">Food</option>
                        <option value="Scenery">Scenery</option>
                        <option value="Video">Video</option>
                        <option value="Music">Music</option>
                        <option value="Thoughts">Thoughts</option>
                        <option value="Study">Study</option>
                        <option value="Archived">Archived</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="postContent.Input">
                  <Form.Label>Tell others what's on your mind</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={(e) =>
                      this.setState({ postContent: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
              <Button
                variant="outline-primary"
                className="mr-auto"
                onClick={postCallback}
              >
                Post
              </Button>
            </Card.Body>
          </Card>
        )}
        {this.state.navigate && (
          <Navigate to={"/posts/" + this.state.postID}></Navigate>
        )}
      </div>
    );
  }
}

export default WritePostCard;
