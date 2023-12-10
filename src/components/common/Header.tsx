import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from '../../state-management/contexts/UserContext';
import { useContext } from 'react';
import HeaderLoggedOut from './HeaderLoggedOut';
import HeaderModerator from './HeaderModerator';
import HeaderUser from './HeaderUser';
import { NavLink } from 'react-router-dom';

export interface HeaderData {
  loggedIn: boolean;
  moderator: boolean;
}

function Header() {
  const { id, role } = useContext(UserContext);
  const isModerator = () => role === "moderator";

  return (
    <Navbar collapseOnSelect expand="lg" bg={role === "moderator" ? "danger" : "light"} variant={role === "moderator" ? "dark" : "light"} sticky="top" >
      <Container>
        <Navbar.Brand>
          <NavLink to={"/browse"} className={"navbar-brand"}>
            Temporal
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav style={{ gap: "20px" }}>
            <HeaderLoggedOut loggedIn={id !== null} moderator={isModerator()} />
            <HeaderModerator loggedIn={id !== null} moderator={isModerator()} />
            <HeaderUser loggedIn={id !== null} moderator={isModerator()} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
