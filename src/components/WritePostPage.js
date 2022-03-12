import React from "react";

import WritePostCard from "./page_components/WritePostCard";

class WritePostPage extends React.Component {
  constructor(props) {
    super(props);
    this.info = props.info;
  }

  render() {
    return (
      <div>
          <WritePostCard info={this.info}></WritePostCard>
      </div>
    );
  }
}

export default WritePostPage;
