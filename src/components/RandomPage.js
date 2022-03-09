import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const getRandomPost = (setPosts) => {
  try {
    fetch("http://localhost:8080/random-post")
      .then((response) => response.json())
      .then((data) => {
        setPosts([data])
    });
  } catch (e) {
   setPosts([]) 
}
};

const RandomPage = (info) => {
    const [posts, setPosts] = useState([])
    getRandomPost(setPosts)
    return posts.length > 0 ? <Navigate to={"/posts/" + posts[0].postID}></Navigate> : "";
};

export default RandomPage;
