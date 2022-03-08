import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import BlogNavbar from "./page_components/BlogNavbar";
import SignModal from "./page_components/SignModal";
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
    this.state = {
      signin: this.info.signin,
      showSignModalType: this.info.showSignModalType,
      searchText: this.info.searschText,
      cookies: this.info.cookies,
    };
  }

  render() {
    const submitSignButtonCallback = (responseJSON) => {
      this.setState({
        signin: true,
        cookies: responseJSON.cookies,
      });
      this.info.appSubmitSignButtonCallback();
    };

    const closeSignButtonCallback = () => {
      this.setState({
        showSignModalType: "",
      });
      this.info.appCloseSignButtonCallback();
    };

    const showSignModalCallback = (newSignModalType) => {
      this.setState({
        showSignModalType: newSignModalType,
      });
      this.info.appShowSignModalCallback();
    };

    const signinStatus = this.state.signin;
    const showSignModalTypeStatus = this.state.showSignModalType;

    // Not signed in yet!
    if (!signinStatus) {
      cardsOnSecondRow[0].disabled = true;
      cardsOnSecondRow[1].disabled = true;
      cardsOnSecondRow[2].disabled = true;
    }

    return (
      <div>
        <Container>
          <Row>
            <BlogNavbar
              signin={signinStatus}
              showSignModalCallback={showSignModalCallback}
            ></BlogNavbar>
          </Row>
        </Container>

        {/* Sign in/Sign up modal */}
        {(showSignModalTypeStatus === "signin" ||
          showSignModalTypeStatus === "signup") && (
          <SignModal
            showSignModalType={showSignModalTypeStatus}
            closeSignButtonCallback={closeSignButtonCallback}
            submitSignButtonCallback={submitSignButtonCallback}
            key={showSignModalTypeStatus + "Modal"}
          ></SignModal>
        )}
        {
          <Container>
            <Row key="row-1" xs={3} md={3} lg={3}>
              {cardsOnFirstRow.map((info) => {
                return (
                  <Col key={"row-1" + info.cardTitle}>
                    <HomePageCard
                      info={info}
                      key={info.cardTitle}
                    ></HomePageCard>
                  </Col>
                );
              })}
            </Row>
            <Row key={"row-2"}>
              {cardsOnSecondRow.map((info) => {
                return (
                  <Col key={"row-2" + info.cardTitle}>
                    <HomePageCard
                      info={info}
                      key={info.cardTitle}
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
