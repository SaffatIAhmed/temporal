import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import CreateListingModal from './CreateListingModal';
import { Button } from 'react-bootstrap';

function Header() {

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
      <Container>
        <Navbar.Brand href="/browse">Temporal</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav style={{ gap: "20px" }}>
            {
              userLoggedIn
                ? (<CreateListingModal />)
                : (null)
            }
            {
              userLoggedIn
                ? (<Nav.Link href={"#saved"} > Saved </Nav.Link>)
                : (<Nav.Link href={"#login"} > Login </Nav.Link>)
            }
            {
              userLoggedIn
                ? (<Nav.Link href={"#logout"} > Logout </Nav.Link>)
                : (<Nav.Link href={"#signup"} > Signup </Nav.Link>)
            }
            <Button onClick={() => setUserLoggedIn(!userLoggedIn)}>Toggle Login</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
