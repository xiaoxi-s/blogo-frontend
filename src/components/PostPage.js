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
      postsThumbupedByUser: [],
    };
  }

  componentDidMount() {
    this.getPost = this.getPost.bind(this)
    this.getPostComments = this.getPostComments.bind(this)
    this.getCommentsThumbupedByUser = this.getCommentsThumbupedByUser.bind(this)
    this.getPostIDsThumbupedByUser = this.getPostIDsThumbupedByUser.bind(this)
    if (this.props.posts === undefined)
      // if a post is already given, just render it!
      this.getPost()
    this.getPostComments()
    if (this.info.signin) {
      this.getCommentsThumbupedByUser() 
      this.getPostIDsThumbupedByUser()
    }
  }

  getPost() {
    fetch(process.env.REACT_APP_REQUEST_URI + "/posts/" + this.props.postID)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ posts: [data] });
      }).catch((e) => console.log(e));
  }

  getPostComments() {
    fetch(process.env.REACT_APP_REQUEST_URI + "/comments/" + this.props.postID)
      .then((response) => response.json())
      .then((responesJSON) => {
        this.setState({ comments: responesJSON });
      })
      .catch((e) => {
        console.log(e)
        this.setState({ comments: [] });
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
        this.setState({ commentsIDThumbupedByUser: responseJSON });
      })
      .catch((e) => {
        console.log(e)
        this.setState({ commentsIDThumbupedByUser: [] });
      });
  }

  getPostIDsThumbupedByUser() {
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
        this.setState({postsThumbupedByUser : responseJSON });
      })
      .catch((e) => {
        console.log(e)
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
    if (posts.length > 0) {
      console.log(this.state.postsThumbupedByUser.includes(posts[0].postID))
    }
    return (
      <div>
        {posts.length === 1 && (
          <div className="posts-div">
            {posts.map((post, ind) => {
              return (
                <Row key={"row-" + post.postID}>
                  <Post post={post} 
                    key={post.postID + (post.username === this.info.username || this.state.postsThumbupedByUser.includes(post.postID))}
                    info={{
                      username: this.info.username,
                      signin: this.info.signin,
                      thumbup: (post.username === this.info.username || this.state.postsThumbupedByUser.includes(post.postID))
                    }}
                    thumbupPostButtonCallback={this.getPostIDsThumbupedByUser}
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
                <Comment 
                key= {comment.commentID + (comment.username === this.info.username || this.state.commentsIDThumbupedByUser.includes(comment.commentID))}
                info={{comment: comment, 
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
