import React from 'react'

import { Container, Row } from "react-bootstrap";
import PostCard from "./page_components/PostCard";
import BlogNavbar from "./page_components/BlogNavbar";
import SignModal from "./page_components/SignModal";

class PostsPage extends React.Component {
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
      fetch("http://localhost:8080/posts")
      .then((response) => response.json())
      .then((data) => {this.setState({posts: data})})
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

        {posts.length > 0 && <div className='posts-div'>
            { 
              posts.map((post, ind) => {
                return (
                  <Row key={"row-" + post.ID}>
                    <PostCard post={post} key={post.ID}></PostCard>
                  </Row>
                )
              })
            }
        </div>}
      </div>
    );
  }
}

export default PostsPage;