import React, {useContext} from "react";
import UserContext from "./UserContext";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./NavBar.css";

function NavBar({userLogout}){
  const {currentUser} = useContext(UserContext);
  return (
    <div className="container">
      <Navbar expand="ms">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        {currentUser ? (
          <Nav className="ml-auto navbar">
            <NavItem>
              <NavLink to="/companies">Companies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/jobs">Jobs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/profile">{currentUser}'s Profile</NavLink>
            </NavItem>
            <NavItem>
              <Link to="/" onClick={() => userLogout()}>
                Logout
              </Link>
            </NavItem>
          </Nav>
        ) : (
          <Nav className="mr-auto navbar">
            <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/signup">Signup</NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
}

export default NavBar;
