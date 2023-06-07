import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, clearStore } from '../../redux/slices/User';
import { toast } from 'react-toastify';
const Header = () => {
  const user = useSelector((state) => state.userReducer.user);
  const isAuthenticated = Object.keys(user).length > 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Writing Handlers Here

  const logoutHandler = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success('Logged Out Sucessfully.');
        navigate('/');
      })
      .catch((err) => {
        err?.response?.data.errors.map((err) => {
          console.log(err);
          if (err === 'Your session has been expired.') {
            dispatch(clearStore());
            navigate('/login');
          }
          return toast.error(err);
        });
      });
  };
  const settingsHandler = () => {
    navigate('/settings');
  };
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">Bookify</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {isAuthenticated ? (
                user.role === 'admin' ? (
                  <>
                    <Nav.Link href="/admin/bookings">Bookings</Nav.Link>
                    <Nav.Link href="/admin/users">Users</Nav.Link>
                    <Nav.Link href="/admin/revenue">Revenue</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link href="/bookings">Bookings</Nav.Link>
                  </>
                )
              ) : (
                <>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              )}
              <Nav.Link href="/#aboutUs">About Us</Nav.Link>
              <Nav.Link href="/#contactUs">Contact Us</Nav.Link>
            </Nav>
            {isAuthenticated && (
              <>
                <Nav>
                  <NavDropdown
                    title={`Welcome ${user?.userName}`}
                    id="basic-nav-dropdown"
                  >
                    <>
                      <NavDropdown.Item onClick={settingsHandler}>
                        Settings
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </>
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
