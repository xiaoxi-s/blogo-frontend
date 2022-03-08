import React from "react";
import { useParams } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import BlogNavbar from "./page_components/BlogNavbar";
import SignModal from "./page_components/SignModal";
import Post from "./page_components/Post";


class PostPageInner extends React.Component {
  constructor(props) {
    super(props);
    this.info = props.info;
    this.state = {
      signin: this.info.signin,
      showSignModalType: this.info.showSignModalType,
      searchText: this.info.searschText,
      cookies: this.info.cookies,
      posts: []
    };
  }

  componentDidMount() {
    this.getposts = this.getPosts.bind(this)
    this.getPosts()
  }

  getPosts() {
    try {
      fetch("http://localhost:8080/posts/" + this.props.postID)
      .then((response) => response.json())
      .then((data) => {this.setState({posts: [data]})})
    } catch (e) {
      this.setState({posts: []})
    }
  }

  render() {
    const signinStatus = this.state.signin;
    const showSignModalTypeStatus = this.state.showSignModalType; // tell Modal to determin sign in or sign up form
    const posts = this.state.posts 
     
    const submitSignButtonCallback = (responseJSON) => {
      this.setState({
        signin: true,
        cookies: responseJSON.cookies,
      });
      this.info.appSubmitSignButtonCallback();
    };

    const closeSignButtonCallback = () => {
      this.setState({
        showSignModalType: "",
      });
      this.info.appCloseSignButtonCallback();
    };

    const showSignModalCallback = (newSignModalType) => {
      this.setState({
        showSignModalType: newSignModalType,
      });
      this.info.appShowSignModalCallback();
    };
    return (
      <div>
        <Container>
          <Row>
            <BlogNavbar
              signin={signinStatus}
              showSignModalCallback={showSignModalCallback}
            ></BlogNavbar>
          </Row>
        </Container>

        {/* Sign in/Sign up modal */}
        {(showSignModalTypeStatus === "signin" ||
          showSignModalTypeStatus === "signup") && (
          <SignModal
            showSignModalType={showSignModalTypeStatus}
            closeSignButtonCallback={closeSignButtonCallback}
            submitSignButtonCallback={submitSignButtonCallback}
            key={showSignModalTypeStatus + "Modal"}
          ></SignModal>
        )}

        {posts.length === 1 && <div className='posts-div'>
            { 
              posts.map((post, ind) => {
                return (
                  <Row key={"row-" + post.postID}>
                    <Post post={post} key={post.postID}></Post>
                  </Row>
                )
              })
            }
        </div>}
      </div>
    );
  }
}

const PostPage = (props) => {
  let { postID } = useParams("postID");
  console.log("postID from useParams: " + postID);
  // postID = "621e99bd15a6b7573db72732";
  console.log(props.info)
  return <PostPageInner postID={postID} info={props.info}></PostPageInner>;
}

export default PostPage;
