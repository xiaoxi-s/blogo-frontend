import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// const RandomPage = (info) => {
//   const [posts, setPosts] = useState([]);
//   useEffect(() => {
//     return () => {
//       setPosts([]);
//     };
//   }, []);
  
//   setTimeout(() => {
//     RandomPage()
//   }, 1000);
//   return  posts.length > 0 ? (
//     <Navigate to={"/posts/" + posts[0].postID}></Navigate>
//   ) : ( 
//     <Navigate to={"/"}></Navigate>
//   );
// };


class RandomPage extends React.Component {
  _isMounted = false
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this._isMounted = true
    this.getRandomPost = this.getRandomPost.bind(this)
    this.getRandomPost()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getRandomPost() {
    fetch(process.env.REACT_APP_REQUEST_URI + "/random-post")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (this._isMounted) {
          this.setState({posts: [data]})
        }
      });
  }

  render() {
    const posts = this.state.posts
    return (
      <div>
      {
        posts.length > 0 && 
        <Navigate to={"/posts/" + posts[0].postID}></Navigate>
      }
      {
        posts.length == 0 &&
        "Waiting..."
      }
      </div>
    )
  }
}

export default RandomPage;
