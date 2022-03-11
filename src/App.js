import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import { Container, Row } from "react-bootstrap"
import { Routes, Route } from "react-router-dom";

import BlogNavbar from "./components/page_components/BlogNavbar";
import SignModal from "./components/page_components/SignModal";

import HomePage from "./components/HomePage";
import PostsPage from "./components/PostsPage";
import DailyPage from "./components/DailyPage";
import CategoriesPage from "./components/CategoriesPage";
import AboutPage from "./components/AboutPage";
import PostPage from "./components/PostPage";
import RandomPage from "./components/RandomPage";

var myStorage = window.sessionStorage

// Create routings and associated pages
const Main = (props) => (
  <Routes>
    <Route
      exact
      path="/"
      element={<HomePage key="homepage" info={props.info}></HomePage>}
    ></Route>
    <Route
      exact
      path="/home"
      element={<HomePage info={props.info} key="homepage-support"></HomePage>}
    ></Route>
    <Route
      exact
      path="/posts"
      element={<PostsPage info={props.info} key="postspage"></PostsPage>}
    ></Route>
    <Route
      exact
      path="/daily"
      element={<DailyPage info={props.info} key="dailypage"></DailyPage>}
    ></Route>
    <Route
      exact
      path="/categories"
      element={
        <CategoriesPage info={props.info} key="categoriespage"></CategoriesPage>
      }
    ></Route>
    <Route
      exact
      path="/about"
      element={<AboutPage info={props.info} key="aboutpage"></AboutPage>}
    ></Route>
    <Route exact path="/posts/:postID" element={<PostPage info={props.info}/>}>  </Route>
    <Route exact path="/random-post" element={<RandomPage></RandomPage>}>
    </Route>
  </Routes>
);



// Front-end App to run
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signin: myStorage.getItem("signin") === null ? false : myStorage.getItem("signin"),
      showSignModalType: "",
      searchText: "",
      cookies: [],
      username: ""
    }
  }

  getPosts() {
    fetch("http://localhost:8080/posts")
      .then((response) => response.json())
      .then((data) => this.setState({ posts: data }));
  }

  getPostComments() {}

  getProfile() {}

  render() {
    const signin = this.state.signin
    const showSignModalType = this.state.showSignModalType
    // callbacks
    const appSignModalSubmitButtonCallback = (responseJSON) => {
      myStorage.removeItem("signin")
      myStorage.setItem("signin", true)
      console.log(myStorage.getItem("signin"))
      this.setState({
        signin: true,
        cookies: responseJSON.cookies
      })
      // this.info.signin = true;
      // this.info.cookies = responseJSON.cookies;
    };

    const appSignModalCloseButtonCallback = () => {
      this.setState({
        showSignModalType: ""
      })
      // this.info.showSignModalType = "";
    };

    const appShowSignModalCallback = (newSignModalType) => {
      this.setState({
        showSignModalType: newSignModalType
      })
      // this.info.showSignModalType = newSignModalType;
    };

    const infoForPageComponent = {
      signin: this.state.signin,
      showSignModalType: this.state.showSignModalType,
      searchText: this.state.searchText,
      cookies: this.state.cookies,
      username: this.state.username
    } 
    return (
      <div>
        <Container>
          <Row>
            <BlogNavbar
              signin={signin}
              showSignModalCallback={appShowSignModalCallback}
            ></BlogNavbar>
          </Row>
        </Container>

        {/* Sign in/Sign up modal */}
        {(showSignModalType === "signin" ||
          showSignModalType === "signup") && (
          <SignModal
            showSignModalType={showSignModalType}
            closeSignButtonCallback={appSignModalCloseButtonCallback}
            submitSignButtonCallback={appSignModalSubmitButtonCallback}
            key={showSignModalType + "Modal"}
          ></SignModal>
        )}
          <Main info={infoForPageComponent} key="main-app"></Main>{" "}
      </div>
    );
  }
}

export default App;
