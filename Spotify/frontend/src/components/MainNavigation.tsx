import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Dropdown,
  Image,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faBell,
  faUsers,
  faClock,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="px-3 py-2 justify-content-between"
    >
      <Container fluid>
        <div className="d-flex align-items-center hap-3">
          <Link to="/">
            <i className="fa fa-spotify" aria-hidden="true"></i>
          </Link>

          <Link to="/" className="text-white">
            <FontAwesomeIcon icon={faHome} size="lg" />
          </Link>
          <Form
            className="d-flex bg-dark rounded-pill align-items-center px-3"
            style={{ border: "1px solid #333", maxWidth: "400px" }}
          >
            <FontAwesomeIcon icon={faSearch} color="#ccc" />
            <FormControl
              type="search"
              placeholder="What do you want to play?"
              className="bg-dark text-white border-0 ms-2"
            />
            <Button variant="link" className="text-white">
              <FontAwesomeIcon icon={faCamera} />
            </Button>
          </Form>
        </div>

        <div className="d-flex align-items center gap-3">
          <FontAwesomeIcon icon={faClock} color="white" title="Install App" />
          <span className="text-white">Install App</span>
          <FontAwesomeIcon icon={faBell} color="white" title="Notification" />
          <FontAwesomeIcon icon={faUsers} color="white" title="Friends" />

          <Dropdown align="end">
            <Dropdown.Toggle variant="dark" className="p-0 border-0">
              <Image src="" roundedCircle width={32} height={32}></Image>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-end">
              <Dropdown.Item as={Link} to="/user">
                Account
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/user/profile">
                Edit Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
