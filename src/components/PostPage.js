import React from "react";
import { useParams } from "react-router-dom";

import { Row } from "react-bootstrap";
import Post from "./page_components/Post";

class PostPageInner extends React.Component {
  constructor(props) {
    super(props);
    this.info = props.info;
    this.state = {
      posts: this.props.posts === undefined ? [] : this.props.posts, // depending on whether a post is given
    };
  }

  componentDidMount() {
    this.getPost = this.getPost.bind(this);
    if (this.props.posts === undefined)
      // if a post is already given, just render it!
      this.getPost();
  }

  getPost() {
    try {
      fetch("http://localhost:8080/posts/" + this.props.postID)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ posts: [data] });
        });
    } catch (e) {
      this.setState({ posts: [] });
    }
  }

  render() {
    const posts = this.state.posts;
    return (
      <div>
        {posts.length === 1 && (
          <div className="posts-div">
            {posts.map((post, ind) => {
              return (
                <Row key={"row-" + post.postID}>
                  <Post post={post} key={post.postID}></Post>
                </Row>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

const PostPage = (props) => {
  let { postID } = useParams("postID");
  return <PostPageInner postID={postID} info={props.info}></PostPageInner>;
};

export default PostPage;
