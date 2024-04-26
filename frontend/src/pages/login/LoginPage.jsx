import React from "react";
import {
  Card,
  Flex,
  Box,
  Text,
  TextField,
  Button,
  Heading,
} from "@radix-ui/themes";
import { User, Key } from "tabler-icons-react";

import { BACKEND } from "../../lib/constants";
import { User as ExistingUser } from "../../lib/token";
export default function LoginPage() {
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const [errorMessage, setErrorMessage] = React.useState(null);
  if (ExistingUser) return window.location.assign("/recipes");

  const apiRoute = `${BACKEND}/api/auth/login`;
  async function handleSubmit() {
    if (!username || !password) {
      setErrorMessage("Missing Required Field(s)");
      return false;
    }

    //Fetch
    fetch(apiRoute, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          window.location.assign("/recipes");
        } else {
          setErrorMessage("Failed to log in");
        }
      })
      .catch((error) => {
        console.error("Error logging in User:\n", error);
        setErrorMessage("Login failed");
      });
  }

  return (
    <div className="grid place-items-center h-[600px]">
      <Card style={{ maxWidth: 440, padding: "40px 10px" }}>
        <div className="grid place-items-center">
          <Heading as="h1">Welcome Back</Heading>
          <div className="w-[300px]">
            <Flex gap="3" justify="center" direction={"column"}>
              <Box>
                <Text as="div" size="2" weight="bold">
                  Username
                </Text>
                <TextField.Root>
                  <TextField.Slot>
                    <User height="16" width="16" />
                  </TextField.Slot>
                  <TextField.Input
                    placeholder="Username"
                    name="usernameInput"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </TextField.Root>

                <Text as="div" size="2" weight="bold">
                  Password
                </Text>
                <TextField.Root>
                  <TextField.Slot>
                    <Key height="16" width="16" />
                  </TextField.Slot>
                  <TextField.Input
                    name="passwordInput"
                    placeholder="*********"
                    type={"password"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </TextField.Root>
                {errorMessage && <Text color="red">{errorMessage}</Text>}
              </Box>
              <Text color="gray" size={"1"}>
                Not already a user?{" "}
                <a href="/register" className="text-blue-600 hover:underline">
                  Sign Up
                </a>
              </Text>
              <Button onClick={handleSubmit}>Log in</Button>
            </Flex>
          </div>
        </div>
      </Card>
    </div>
  );
}
