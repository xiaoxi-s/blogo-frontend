import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsHandThumbsUp } from "react-icons/bs";

import './Post.css'

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.info = props.info
    this.thumbupPostButtonCallback = props.thumbupPostButtonCallback 
  }

  thumbupPost() {
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
      process.env.REACT_APP_REQUEST_URI + "/posts/thumbup/" + this.comment.commentID,
      requestOptions
    )
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON.error !== undefined) {
          throw "thumbup failed";
        } else {
          this.thumbupPostButtonCallback()
        }
      }).catch((e) => console.log(e))
  }

  render() {
    const hashForImages = function (cardTitle) {
      var h = 0,
        l = cardTitle.length,
        i = 0;
      if (l > 0) while (i < l) h = ((h << 5) - h + cardTitle.charCodeAt(i++)) | 0;
      return Math.abs(h);
    };

    var postImgSrc;
    if (this.props.post.postImg === undefined) {
      postImgSrc = "../img/full-pics/" + hashForImages(this.props.post.postTitle)%10 + ".jpg" 
    }

    var postLastUpdatedTime = new Date(this.props.post.postLastUpdatedTime)
    var date = postLastUpdatedTime.getDate()+
          "/"+(postLastUpdatedTime.getMonth()+1)+
          "/"+postLastUpdatedTime.getFullYear()+
          " "+postLastUpdatedTime.getHours()+
          ":"+postLastUpdatedTime.getMinutes()+
          ":"+postLastUpdatedTime.getSeconds(); 
    return (
      <div className="post">
        <Card
          style={{ width: "78%" }}
          className="h-100 shadow-sm bg-white rounded"
        >
          <Card.Img variant="top" src={postImgSrc} alt="" width={this.width} height="100%"/>
          <Card.Header>Author: {this.props.post.username}</Card.Header>
          <Card.Body>
            <Card.Title> {this.props.post.postTitle} </Card.Title>
            <Card.Text>
              {this.props.post.postContent}
            </Card.Text>
            <Button variant="outline-primary" className="mr-auto" disabled={ (!this.info.signin || this.info.thumbup)} onClick={this.thumbupPost}>
              <BsHandThumbsUp></BsHandThumbsUp>
              {this.props.post.postNumOfThumb}
            </Button>
            <Card.Footer className="text-muted" fontSize="sm">
                Last updated: {date}
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Post;