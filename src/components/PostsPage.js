import React from "react";

import { Row } from "react-bootstrap";
import PostCard from "./page_components/PostCard";

class PostsPage extends React.Component {
  constructor(props) {
    super(props)
    this.info = props.info
    this.username = this.info.username

    this.state = {
      posts: [],
      postsThumbupedByUser: [],
    };
  }

  componentDidMount() {
    this.getPosts = this.getPosts.bind(this);
    this.getPostsIDThumbupedByUser = this.getPostsIDThumbupedByUser.bind(this)
    this.getPosts();
    console.log(this.info.signin)
    if (this.info.signin) {
      this.getPostsIDThumbupedByUser()
    }
  }

  getPosts() {
    fetch(process.env.REACT_APP_REQUEST_URI + "/posts", {
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ posts: data });
      }).catch((e) => { console.log(e) })
  }

  getPostsIDThumbupedByUser() {
    const requestOptions = {
      method: "GET",
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
        "Access-Control-Request-Methods": ["GET"],
      },
      withCredentials: true,
      credentials: "include",
    }
    fetch(process.env.REACT_APP_REQUEST_URI + "/posts/thumbupedby/" + this.info.username, requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({ postsThumbupedByUser: responseJSON });
      })
      .catch((e) => {
        this.setState({ postsThumbupedByUser: [] });
      })
  }

  render() {
    const posts = this.state.posts;
    return (
      <div>
        {posts.length > 0 && (
          <div className="posts-div">
            {posts.map((post, ind) => {
              const thumbup = (post.username === this.info.username || this.state.postsThumbupedByUser.includes(post.postID))
              return (
                <Row key={"row-" + post.postID}>
                  <PostCard
                    key={post.postID + thumbup}
                    info={{ post: post, thumbup: thumbup, signin: this.info.signin, username: this.info.username }}
                    thumbupButtonCallback={this.getPostsIDThumbupedByUser}
                  ></PostCard>
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
