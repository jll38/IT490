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
import { User, Key, Mail } from "tabler-icons-react";

export default function RegisterPage() {
  const [username, setUsername] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const [errorMessage, setErrorMessage] = React.useState(null);

  const apiRoute = "http://localhost:8000/api/auth/register";

  async function handleSubmit() {
    if (!username || !password || !email) {
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
        email,  
        password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          console.error("Error logging in User:\n");
          return null;
        } else {
          window.location.assign("/register/onboarding");
          localStorage.setItem("user", username);
          localStorage.setItem("onboarding_complete", false);
        }
      })
      .finally((data) => {
        console.log(data);
      });
  }

  return (
    <div className="grid place-items-center h-[600px]">
      <Card style={{ maxWidth: 440, padding: "40px 10px" }}>
        <div className="grid place-items-center">
          <Heading as="h1">Sign Up</Heading>
          <Text color="gray" size={"1"}>Let's get your info</Text>
          <div className="w-[300px]">
            <Flex gap="3" justify="center" direction={"column"}>
              <Box>
                <Text as="div" size="2" weight="bold">
                  Email
                </Text>
                <TextField.Root>
                  <TextField.Slot>
                    <Mail height="16" width="16" />
                  </TextField.Slot>
                  <TextField.Input
                    name="emailInput"
                    placeholder="John@example.com"
                    type={"email"}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </TextField.Root>
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
                Already a user?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Log In
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
