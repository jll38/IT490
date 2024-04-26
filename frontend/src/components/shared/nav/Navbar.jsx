import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown } from "./profile-dropdown/dropdown";
import "./Navbar.css";

import { Flex, Text, Button, Link } from "@radix-ui/themes";
import { User } from "../../../lib/token";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-left">
        <Link href="/" className="nav">
          Nutripal
        </Link>
      </div>
      {User ? (
        <div className="nav-right">
          <Dropdown user={User.username}/>
        </div>
      ) : (
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
      )}
    </nav>
  );
}
