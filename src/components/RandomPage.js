import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const getRandomPost = (setPosts) => {
  try {
    fetch(process.env.REACT_APP_REQUEST_URI + "/random-post")
      .then((response) => response.json())
      .then((data) => {
        setPosts([data]);
      });
  } catch (e) {
    setPosts([]);
  }
};

const RandomPage = (info) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getRandomPost(setPosts);
  }, []);
  return posts.length > 0 ? (
    <Navigate to={"/posts/" + posts[0].postID}></Navigate>
  ) : ( 
    <Navigate to={"/"}></Navigate>
  );
};

export default RandomPage;
