import React from "react";

class CategoriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.info = props.info;
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>Categories</p>
      </div>
    );
  }
}

export default CategoriesPage;
