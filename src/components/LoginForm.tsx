import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
//import "../styles/ListingCard.scss";



function LoginForm() {
  return (
    <div className="testing">
      <Card>
        <Card.Body>
          <Card.Title>Welcome!</Card.Title>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
                <Form.Control type="username" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
                <Form.Control type="password" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginForm;
