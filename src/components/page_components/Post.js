import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsHandThumbsUp } from "react-icons/bs";

import './Post.css'

class Post extends React.Component {
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
            <Button variant="outline-primary" className="mr-auto">
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