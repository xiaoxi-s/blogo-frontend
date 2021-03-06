import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import HomePageCard from "./page_components/HomePageCard";

const cardsOnFirstRow = [
  {
    cardTitle: "Post",
    cardText: "Read a new post",
    buttonText: "Go!",
    href: "/random-post",
    color: "Primary",
    disabled: false,
  },
  {
    cardTitle: "Daily",
    cardText: "Browse a piece of daily news",
    buttonText: "Go!",
    href: "/daily",
    color: "Info",
    disabled: false,
  },
  {
    cardTitle: "Categories",
    cardText: "Explore a category",
    buttonText: "Go!",
    href: "/posts",
    color: "Danger",
    disabled: false,
  },
];

const cardsOnSecondRow = [
  {
    cardTitle: "Write a Post",
    cardText: "Tell your stories, express your feelings ...",
    buttonText: "Go!",
    href: "/write-post",
    color: "Warning",
    disabled: false,
  },
  {
    cardTitle: "Save Your Favorate",
    cardText: "Save your favorite posts",
    buttonText: "Go!",
    color: "Success",
    disabled: false,
  },
  {
    cardTitle: "To be Continued...",
    cardText: "Waiting for New Functions",
    buttonText: "",
    color: "Secondary",
    disabled: false,
  },
];

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.info = props.info;
    this.state = {};
  }

  render() {
    const signin = this.info.signin;

    // Not signed in yet!
    if (!signin) {
      cardsOnSecondRow[0].disabled = true;
      cardsOnSecondRow[1].disabled = true;
      cardsOnSecondRow[2].disabled = true;
    } else {
      cardsOnSecondRow[0].disabled = false;
      cardsOnSecondRow[1].disabled = false;
      cardsOnSecondRow[2].disabled = false;
    }

    return (
      <div>
        {
          <Container>
            <Row key="row-1" xs={3} md={3} lg={3}>
              {cardsOnFirstRow.map((card) => {
                return (
                  <Col key={"row-1" + card.cardTitle}>
                    <HomePageCard
                      info={card}
                      key={card.cardTitle}
                    ></HomePageCard>
                  </Col>
                );
              })}
            </Row>
            <Row key={"row-2"}>
              {cardsOnSecondRow.map((card) => {
                return (
                  <Col key={"row-2" + card.cardTitle}>
                    <HomePageCard
                      info={card}
                      key={card.cardTitle}
                    ></HomePageCard>
                  </Col>
                );
              })}
            </Row>
          </Container>
        }
      </div>
    );
  }
}

export default HomePage;
