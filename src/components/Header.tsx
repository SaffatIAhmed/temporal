import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CreateListingModal from './CreateListingModal';
import { UserContext, UserDispatchContext } from '../state-management/contexts/UserContext';
import { useContext } from 'react';
import { UserActionKind } from '../state-management/reducers/UserReducer';

function Header() {
  const { isLoggedIn } = useContext(UserContext);
  const dispatch = useContext(UserDispatchContext);

  const handleLogout = () => {
    dispatch({ type: UserActionKind.LOGOUT });
  }


  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
      <Container>
        <Navbar.Brand href="/browse">Temporal</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav style={{ gap: "20px" }}>
            {
              isLoggedIn
                ? (<>
                  <CreateListingModal />
                  <Nav.Link href={"/posted"} >Posted</Nav.Link>
                </>)
                : (null)
            }
            {
              isLoggedIn
                ? (<Nav.Link href={"/saved"} >Saved</Nav.Link>)
                : (<Nav.Link href={"/login"} >Login</Nav.Link>)
            }
            {
              isLoggedIn
                ? (<button className='nav-link' onClick={handleLogout}>Logout</button>)
                : (<Nav.Link href={"/signup"} >Signup</Nav.Link>)
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
