import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function SignupForm() {
  return (
    <div className="testing">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Sign up</Card.Title>
          <Form>
            <Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="firstName" />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="lastName"/>
              </Col>
            </Row>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
          </Form>
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignupForm;
