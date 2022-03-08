import Card from "react-bootstrap/Card";
import "./Comment.css";
import { BsHandThumbsUp } from "react-icons/bs";

class Comments extends React.Component {
  render() {
    <div className="postcard">
      <Card
        style={{ width: "40rem" }}
        className="h-100 shadow-sm bg-white rounded"
      >
        <Card.Body>
          <Card.Title> {this.props.comment.username} </Card.Title>
          <Card.Text>{this.props.comment.content}</Card.Text>
          <Button variant="primary">
            <BsHandThumbsUp></BsHandThumbsUp>
          </Button>
        </Card.Body>
      </Card>
    </div>;
  }
}

export default Comments;