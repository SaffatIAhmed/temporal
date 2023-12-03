import { Card, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

function SignupPage() {
    return (
        <Container fluid>
            <Card style={{ width: "24rem" }} className='mx-auto p-4'>
                <Card.Title>Sign up</Card.Title>
                <Card.Body>
                    <RegisterForm />
                    <div className="text-center mt-2">
                        Already registered? <NavLink to={"/login"}>Sign In</NavLink>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default SignupPage;