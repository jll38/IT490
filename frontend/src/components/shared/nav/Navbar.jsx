import React from "react";
import { NavLink } from "react-router-dom";
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
          <div>{user}</div>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("onboarding_complete");
              window.location.assign("/");
            }}
          >
            Sign Out
          </button>
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
