import React from "react";
import { useParams } from "react-router-dom";

import { Row } from "react-bootstrap";
import Post from "./page_components/Post";
import Comment from "./page_components/Comment";
import WriteCommentCard from "./page_components/WriteCommentCard";

/**
 * PostPageInner is the main component of the page for a single post.
 */
class PostPageInner extends React.Component {
  /**
   *
   * @param {*} props: contains the following key value pairs
   *   searchText: string
   *   showSignModalType: string
   *   signin: boolean
   *   username: string
   */
  constructor(props) {
    super(props);
    this.info = props.info;
    this.state = {
      posts: this.props.posts === undefined ? [] : this.props.posts, // depending on whether a post is given
      comments: [],
      commentsIDByUser: [],
      commentsIDThumbupedByUser: [],
    };
  }

  componentDidMount() {
    this.getPost = this.getPost.bind(this)
    this.getPostComments = this.getPostComments.bind(this)
    this.getCommentsByUser = this.getCommentsByUser.bind(this)
    this.getCommentsThumbupedByUser = this.getCommentsThumbupedByUser.bind(this)
    if (this.props.posts === undefined)
      // if a post is already given, just render it!
      this.getPost()
    this.getPostComments()
    if (this.info.signin) {
      this.getCommentsThumbupedByUser() 
    }
  }

  getPost() {
    try {
      fetch(process.env.REACT_APP_REQUEST_URI + "/posts/" + this.props.postID)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ posts: [data] });
        });
    } catch (e) {
      this.setState({ posts: [] });
    }
  }

  getPostComments() {
    fetch(process.env.REACT_APP_REQUEST_URI + "/comments/" + this.props.postID)
      .then((response) => response.json())
      .then((responesJSON) => {
        this.setState({ comments: responesJSON });
      })
      .catch((e) => {
        this.setState({ comments: [] });
      });
  }

  getCommentsByUser() {
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
    };
    fetch(process.env.REACT_APP_REQUEST_URI + "/comments/by/" + this.info.username, requestOptions)
      .then((response) => response.json())
      .then((responesJSON) => {
        this.setState({ commentsIDByUser: responesJSON });
      })
      .catch((e) => {
        this.setState({ commentsIDByUser: [] });
      });
  }

  getCommentsThumbupedByUser() {
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
    };
    fetch(process.env.REACT_APP_REQUEST_URI + "/comments/thumbupedby/" + this.info.username, requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON)
        this.setState({ commentsIDThumbupedByUser: responseJSON });
      })
      .catch((e) => {
        this.setState({ commentsIDThumbupedByUser: [] });
      });
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
    const comments = this.state.comments;

    const writeCommentInfo = {
      postID: this.props.postID,
      username: this.info.username,
      signin: this.info.signin
    };
    return (
      <div>
        {posts.length === 1 && (
          <div className="posts-div">
            {posts.map((post, ind) => {
              return (
                <Row key={"row-" + post.postID}>
                  <Post post={post} 
                    key={post.postID}
                    info={{
                      signin: this.info.signin,
                      thumbup: (post.username === this.info.username || this.state.postsThumbupedByUser.includes(post.postID))
                    }}
                    thumbupPostButtonCallback={this.getCommentsThumbupedByUser}
                  ></Post>
                </Row>
              );
            })}
          </div>
        )}
        {<WriteCommentCard info={writeCommentInfo}></WriteCommentCard>}
        {comments.length >= 1 &&
          comments.map((comment, ind) => {
            return (
              <Row key={"row" + comment.commentID}>
                <Comment info={{comment: comment, 
                                username: this.info.username,
                                signin: this.info.signin, 
                                thumbuped: comment.username === this.info.username || this.state.commentsIDThumbupedByUser.includes(comment.commentID)
                }}
                         thumbupButtonCallback={this.getCommentsThumbupedByUser}
                >
                </Comment>

              </Row>
            );
          })}
      </div>
    );
  }
}

const PostPage = (props) => {
  let { postID } = useParams("postID");
  return <PostPageInner postID={postID} info={props.info}></PostPageInner>;
};

export default PostPage;
