import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';


function Header() {
  let userLoggedIn = true; //Temporary until we implement user log ins
  if(userLoggedIn){
    return (

      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/browse">Temporal</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav style={{gap: "20px"}}>
              <Nav.Link href="#account">Account</Nav.Link>
              <Nav.Link href="/saved">Saved</Nav.Link>
              <Button variant="success" href="#newrental">List your rental</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  else{
    return (

      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/browse">Temporal</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav style={{gap: "20px"}}>
              <Nav.Link href="#signup">Sign up</Nav.Link>
              <Nav.Link href="#login">Log in</Nav.Link>
              <Button variant="success" href="#newrental">List your rental</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
