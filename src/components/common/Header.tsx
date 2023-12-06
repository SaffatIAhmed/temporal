import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from '../../state-management/contexts/UserContext';
import { useContext } from 'react';
import HeaderLoggedOut from './HeaderLoggedOut';
import HeaderModerator from './HeaderModerator';
import HeaderUser from './HeaderUser';

export interface HeaderData {
  loggedIn: boolean;
  moderator: boolean;
}

function Header() {
  const { isLoggedIn, role } = useContext(UserContext);
  const isModerator = () => role === "moderator";

  return (
    <Navbar collapseOnSelect expand="lg" bg={role === "moderator" ? "danger" : "light"} variant={role === "moderator" ? "dark" : "light"} sticky="top" >
      <Container>
        <Navbar.Brand href="/browse">Temporal</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav style={{ gap: "20px" }}>
            <HeaderLoggedOut loggedIn={isLoggedIn} moderator={isModerator()} />
            <HeaderModerator loggedIn={isLoggedIn} moderator={isModerator()} />
            <HeaderUser loggedIn={isLoggedIn} moderator={isModerator()} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
