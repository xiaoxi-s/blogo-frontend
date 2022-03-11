import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";

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
    this.info = {};
    this.info.signin = myStorage.getItem("signin") === null ? false : myStorage.getItem("signin");
    this.info.showSignModalType = "";
    this.info.searchText = "";
    this.info.cookies = "";
    this.info.posts = [];
    this.username = "";
  }

  getPosts() {
    fetch("http://localhost:8080/posts")
      .then((response) => response.json())
      .then((data) => this.setState({ posts: data }));
  }

  getPostComments() {}

  getProfile() {}

  render() {
    // callbacks
    const appSubmitSignButtonCallbackFunc = (responseJSON) => {
      this.info.signin = true;
      myStorage.removeItem("signin")
      myStorage.setItem("signin", true)
      console.log(myStorage.getItem("signin"))
      this.info.cookies = responseJSON.cookies;
    };

    const appCloseSignButtonCallbackFunc = () => {
      this.info.showSignModalType = "";
    };

    const appShowSignModalCallbackFunc = (newSignModalType) => {
      this.info.showSignModalType = newSignModalType;
    };

    const newInfo = {
      signin: this.info.signin,
      showSignModalType: this.info.showSignModalType,
      appShowSignModalCallback: appShowSignModalCallbackFunc,
      appCloseSignButtonCallback: appCloseSignButtonCallbackFunc,
      appSubmitSignButtonCallback: appSubmitSignButtonCallbackFunc,
    };
    return (
      <div
        // style={{
        //   backgroundImage: 'url("./img/background.jpg")',
        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        //   width: "100vw",
        //   height: "100vh",
        // }}
      >
          <Main info={newInfo} key="main-app"></Main>{" "}
      </div>
    );
  }
}

export default App;
