import React from "react";

class DailyPage extends React.Component {
  constructor(props) {
    super(props);
    this.info = props.info;
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>News</p>
      </div>
    );
  }
}

export default DailyPage;
