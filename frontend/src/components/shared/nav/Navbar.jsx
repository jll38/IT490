import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

import { Flex, Text, Button, Link } from "@radix-ui/themes";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-left">
        <Link href="/" className="nav">
          Recipe App
        </Link>
      </div>
      <div className="nav-right">
        <a href="/login" className="nav">
          Log In
        </a>

        <Button
          onClick={() => {
            window.location.assign("/register");
          }}
        >
          Sign Up
        </Button>
      </div>
    </nav>
  );
}
