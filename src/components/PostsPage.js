import React from "react";

import { Row } from "react-bootstrap";
import PostCard from "./page_components/PostCard";

class PostsPage extends React.Component {
  constructor(props) {
    super(props);
    this.info = props.info;
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.getPosts = this.getPosts.bind(this);
    this.getPosts();
  }

  getPosts() {
    try {
      fetch("http://localhost:8080/posts", {
          credentials: "same-origin",
        })
        .then((response) => response.json())
        .then((data) => {
          this.setState({ posts: data });
        });
    } catch (e) {
      this.setState({ posts: [] });
    }
  }

  render() {
    const posts = this.state.posts;

    return (
      <div>
        {posts.length > 0 && (
          <div className="posts-div">
            {posts.map((post, ind) => {
              return (
                <Row key={"row-" + post.ID}>
                  <PostCard post={post} key={post.ID}></PostCard>
                </Row>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default PostsPage;
