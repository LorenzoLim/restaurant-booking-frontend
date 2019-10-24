import * as React from "react";
import { NavLink } from "react-router-dom";
import { NavbarButton } from "../ui/NavbarButton";

const Navbar = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "50px",
        backgroundColor: "#bc002d"
      }}
    >
      <div style={{ float: "right" }}>
        <NavLink className="navbar-item" to="/" activeClassName="is-active">
          <NavbarButton style={{ fontSize: 18 }}>Home</NavbarButton>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
