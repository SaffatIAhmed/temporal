import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/LoginForm.scss";

interface Props {
  welcomeMsg: string;
}

function LoginForm({ welcomeMsg }: Props) {
  return (
    <div>
      <Card className = 'loginCard'>
        <Card.Body>
          <Card.Title>{welcomeMsg}</Card.Title>
          <Form className='form'>
            <Form.Group>
              <Form.Label>Username</Form.Label>
                <Form.Control type="username" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
                <Form.Control type="password" required />
            </Form.Group>
            <div className="submit-btn">
              <Button variant="primary" type="submit">
                Log In
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginForm;
