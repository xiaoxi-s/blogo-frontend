import React from "react";
import { Navigate } from "react-router-dom";

import WritePostCard from "./page_components/WritePostCard";

class WritePostPage extends React.Component {
  constructor(props) {
    super(props);
    this.info = props.info;
  }

  render() {
    if (!this.info.signin) {
      return <Navigate to="/home"></Navigate>
    }
    return (
      <div>
          <WritePostCard info={this.info}></WritePostCard>
      </div>
    );
  }
}

export default WritePostPage;
