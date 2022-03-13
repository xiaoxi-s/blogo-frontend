import React from "react";
import { Row, Container } from "react-bootstrap";

import NewsCard from "./page_components/NewsCard";

class DailyPage extends React.Component {
  constructor(props) {
    super(props);
    this.info = props.info;
    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    this.getNews = this.getNews.bind(this);
    this.getNews();
  }

  getNews() {
    fetch("http://localhost:8080/daily")
      .then((response) => response.json())
      .then((responseJSON) => this.setState({ news: responseJSON }));
  }

  render() {
    console.log(this.state.news);
    return (
      <Container>
        {this.state.news.map((oneNews, ind) => {
          return (
            <Row key={"news" + ind}>
              <NewsCard news={oneNews}></NewsCard>
            </Row>
          );
        })}
      </Container>
    );
  }
}

export default DailyPage;
