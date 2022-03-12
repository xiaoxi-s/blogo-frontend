import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsHandThumbsUp } from "react-icons/bs";

import "./PostCard.css";

class PostCard extends React.Component {
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
      postImgSrc = "./img/pics/" + hashForImages(this.props.post.postTitle)%10 + ".jpg" 
    }
    
    return (
      <div className="postcard">
        <Card
          style={{ width: "78%" }}
          className="h-100 shadow-sm bg-white rounded"
        >
          <Card.Img variant="top" src={postImgSrc} alt="" width={this.width} height={this.width*0.2}/>
          <Card.Body>
            <Card.Title> {this.props.post.postTitle} </Card.Title>
            <Card.Text>
              {this.props.post.postContent.slice(0, 200)}
              {this.props.post.postContent.length > 200 && <p>...</p>}
            </Card.Text>
            <Button variant="outline-primary" className="mr-auto">
              View post
            </Button>
            <Button variant="outline-primary" className="mr-auto">
              <BsHandThumbsUp></BsHandThumbsUp>
              {" " + this.props.post.postNumOfThumb}
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default PostCard;
