import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsHandThumbsUp } from "react-icons/bs";

import "./PostCard.css";

class PostCard extends React.Component {
  constructor(props) {
    super(props)
    this.info = this.props.info

    this.thumbupPost = this.thumbupPost.bind(this)
    this.thumbupButtonCallback = this.props.thumbupButtonCallback
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
        username: this.info.username,
      }),
    };
    fetch(
      process.env.REACT_APP_REQUEST_URI + "/posts/thumbup/" + this.info.post.postID,
      requestOptions
    )
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON.error !== undefined) {
          throw "thumbup failed";
        } else {
          this.thumbupButtonCallback()
        }
      });
  }

  render() {
    const post = this.info.post
    const hashForImages = function (cardTitle) {
      var h = 0,
        l = cardTitle.length,
        i = 0;
      if (l > 0) while (i < l) h = ((h << 5) - h + cardTitle.charCodeAt(i++)) | 0;
      return Math.abs(h);
    };

    var postImgSrc;
    if (post.postImg === undefined) {
      postImgSrc = "./img/pics/" + hashForImages(post.postTitle)%10 + ".jpg" 
    }

    return (
      <div className="postcard">
        <Card
          style={{ width: "78%" }}
          className="h-100 shadow-sm bg-white rounded"
        >
          <Card.Img variant="top" src={postImgSrc} alt="" width={this.width} />
          <Card.Body>
            <Card.Title> {post.postTitle} </Card.Title>
            <Card.Text>
              {post.postContent.slice(0, 200)}
              {post.postContent.length > 200 && <p>...</p>}
            </Card.Text>
            <Button variant="outline-primary" className="mr-auto" href={"/posts/" + post.postID}>
              View post
            </Button>
            <Button variant="outline-primary" className="mr-auto" disabled={(!this.info.signin || this.info.thumbup)} onClick={this.thumbupPost}>
              <BsHandThumbsUp></BsHandThumbsUp>
              {" " + post.postNumOfThumb}
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default PostCard;
