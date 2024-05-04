import React from "react";
import { PersonIcon } from "@radix-ui/react-icons";
import TDEECalculator from "../../components/TDEE/TDEECalculator";
import { BACKEND } from "../../lib/constants";
import { User } from "../../lib/token";
import { useParams } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import "./profile.css";
import { ForumPost } from "../../components/form/ForumPost";

export default function Profile() {
  const [dietaryRestrictions, setDietRestrictions] = React.useState([]);
  const [tdee, setTDEE] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  let { username } = useParams();
  const profileUser = username ? username : User.username;
  const handleChange = (event) => {
    const { value, checked } = event.target;
    setDietRestrictions((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  React.useEffect(() => {
    fetch(`${BACKEND}/api/auth/user-settings/${profileUser}`).then((res) => {
      if (res.ok) {
        console.log("Successfully fetched user settings...");
        res.json().then((data) => {
          setDietRestrictions(
            JSON.parse(data.dietary_restrictions.replace(/'/g, '"'))
          );
          setTDEE(data.TDEE);
        });
      } else {
        res
          .json()
          .then((data) => {
            console.log(data);
            setError(true);
            console.error(
              "Error:",
              data.detail || "Failed to retrieve user settings"
            );
          })
          .catch((error) => {
            console.error("Failed to parse response:", error);
          });
      }
    });

    fetch(
      `${BACKEND}/api/forum/posts/user/${profileUser}?user_id=${parseInt(
        User.user_id
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return error ? (
    <div>User does not exist</div>
  ) : (
    <div className="pageContainer">
      <section className="p-8 text-black/[0.87] flex-col flex gap-4 items-center w-full min-[0px]:pb-16  min-[576px]:pb-16 min-[992px]:pb-20">
        <h1 className="text-sm text-gray">Profile</h1>
        <PersonIcon style={{ scale: "300%" }} />
        <h2 className="text-3xl">{username}</h2>
        <p>
          <em>{username}</em> dietary preferences:
          <ul>
            {dietaryRestrictions.map((item, i) => {
              <li>{item}</li>;
            })}
          </ul>
        </p>
        <Tabs.Root className="TabsRoot" defaultValue="forum">
          <Tabs.List className="TabsList" aria-label="Manage your account">
            <Tabs.Trigger className="TabsTrigger" value="forum">
              Forum Posts
            </Tabs.Trigger>
            <Tabs.Trigger className="TabsTrigger" value="liked">
              Liked Recipes
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="TabsContent" value="forum">
            <p className="Text">
              View <em>{username}'s</em> forum posts
            </p>
            {posts.map((post, i) => {
              console.log(post);
              return <ForumPost post={post} />;
            })}
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="liked">
            <p className="Text">
              View <em>{username}'s</em> liked recipes
            </p>
          </Tabs.Content>
        </Tabs.Root>
      </section>
    </div>
  );
}
