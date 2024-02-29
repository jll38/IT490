import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

import { Flex, Text, Button } from '@radix-ui/themes';

export default function Navbar() {
  return (
    <nav>
      <div className="nav-left">
        <NavLink to="/" className="nav">
          Recipe App
        </NavLink>
      </div>
      <div className="nav-right">
        <NavLink to="/" className="nav">
          Home
        </NavLink>
        <NavLink to="/login" className="nav">
          Log In
        </NavLink>
        <NavLink to="/register" className="nav">
        <Button>Sign Up</Button>
        </NavLink>
      </div>
    </nav>
  );
}
