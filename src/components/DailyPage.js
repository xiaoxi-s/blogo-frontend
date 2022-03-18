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
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Credentials": true,
        "Access-Control-Request-Headers": ["Origin", "Content-Type", "Access-Control-Request-Credentials", "Cookie", "Access-Control-Request-Methods"],
        "Access-Control-Request-Methods": ["POST"],
      },
      withCredentials: true,
      credentials: "include",
      body: JSON.stringify({
        url: "https://news.google.com/rss"
      }),
    };
    fetch(process.env.REACT_APP_REQUEST_NEWS_URI + "/parse", requestOptions)
      .then((response) => {console.log(response.json())})
      .catch((e) => {console.log("update news request rejected")})
    fetch(process.env.REACT_APP_REQUEST_URI + "/news")
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
