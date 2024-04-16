import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown } from "./profile-dropdown/dropdown";
import "./Navbar.css";

import { Flex, Text, Button, Link } from "@radix-ui/themes";

export default function Navbar() {
  const user = localStorage.getItem("user");
  const onboarding_complete = Boolean(
    localStorage.getItem("onboarding_complete")
  );

  return (
    <nav>
      <div className="nav-left">
        <Link href="/" className="nav">
          Recipe App
        </Link>
      </div>
      {user ? (
        <div className="nav-right">
          <Dropdown user={user}/>
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
