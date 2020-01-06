import * as React from "react";
import { NavLink } from "react-router-dom";
import { NavbarButton } from "../ui/NavbarButton";

const Navbar = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "50px",
        backgroundColor: "#ff3232"
      }}
    >
      <div style={{ float: "right", margin: "0px 10px" }}>
        <NavLink className="navbar-item" to="/" activeClassName="is-active">
          <NavbarButton style={{ fontSize: 18 }}>Home</NavbarButton>
        </NavLink>
        <NavLink className="navbar-item" to="/" activeClassName="is-active">
          <NavbarButton style={{ fontSize: 18 }}>Bookings</NavbarButton>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
