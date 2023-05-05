import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useDispatch } from "react-redux";
import { signout } from "../../redux/Admin/admin.actions";

function MyNavbar() {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(signout());
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src="/images/logo.png" alt="" style={{ width: "40px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Events</Nav.Link>
          </Nav>
          <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
