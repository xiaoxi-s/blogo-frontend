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
    };
  }

  componentDidMount() {
    this.getPost = this.getPost.bind(this);
    this.getPostComments = this.getPostComments.bind(this);
    if (this.props.posts === undefined)
      // if a post is already given, just render it!
      this.getPost();
    this.getPostComments();
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

  getPostComments() {
    fetch("http://localhost:8080/comments/" + this.props.postID)
      .then((response) => response.json())
      .then((responesJSON) => {
        this.setState({ comments: responesJSON });
      })
      .catch((e) => {
        this.setState({ comments: [] });
      });
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
                  <Post post={post} key={post.postID}></Post>
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
                <Comment info={{comment: comment, signin: this.info.signin}}></Comment>
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
