import React from "react";
import { PersonIcon } from "@radix-ui/react-icons";
import TDEECalculator from "../../components/TDEE/TDEECalculator";
import { BACKEND } from "../../lib/constants";
import { User } from "../../lib/token";
import { useParams } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import "./profile.css";
import { ForumPost } from "../../components/form/ForumPost";
import { Button } from "@radix-ui/themes";

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
          console.log("Diet");
          console.log(dietaryRestrictions);
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
      `${BACKEND}/api/forum/posts/user/${profileUser}?user_id=${
        User ? parseInt(User.user_id) : 0
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);

    alert(
      "Profile link has been copied to clipboard. Feel free to share! \n" +
        window.location.href
    );
  }
  return error ? (
    <div>User does not exist</div>
  ) : (
    <div className="pageContainer">
      <section className="p-8 text-black/[0.87] flex-col flex gap-4 items-center w-full min-[0px]:pb-16  min-[576px]:pb-16 min-[992px]:pb-20">
        <h1 className="text-sm text-gray">Profile</h1>
        <PersonIcon style={{ scale: "300%" }} />
        <h2 className="text-3xl">{username}</h2>
        <Button onClick={handleShare} className="max-w-[140px]">
          {" "}
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.50003C5 8.32845 4.32843 9.00003 3.5 9.00003C2.67157 9.00003 2 8.32845 2 7.50003C2 6.6716 2.67157 6.00003 3.5 6.00003C4.32843 6.00003 5 6.6716 5 7.50003ZM5.71313 8.66388C5.29445 9.45838 4.46048 10 3.5 10C2.11929 10 1 8.88074 1 7.50003C1 6.11931 2.11929 5.00003 3.5 5.00003C4.46048 5.00003 5.29445 5.54167 5.71313 6.33616L9.10424 4.21671C9.03643 3.98968 9 3.74911 9 3.50003C9 2.11932 10.1193 1.00003 11.5 1.00003C12.8807 1.00003 14 2.11932 14 3.50003C14 4.88074 12.8807 6.00003 11.5 6.00003C10.6915 6.00003 9.97264 5.61624 9.51566 5.0209L5.9853 7.22738C5.99502 7.31692 6 7.40789 6 7.50003C6 7.59216 5.99502 7.68312 5.9853 7.77267L9.51567 9.97915C9.97265 9.38382 10.6915 9.00003 11.5 9.00003C12.8807 9.00003 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5C9 11.2509 9.03643 11.0104 9.10425 10.7833L5.71313 8.66388ZM11.5 5.00003C12.3284 5.00003 13 4.32846 13 3.50003C13 2.6716 12.3284 2.00003 11.5 2.00003C10.6716 2.00003 10 2.6716 10 3.50003C10 4.32846 10.6716 5.00003 11.5 5.00003ZM13 11.5C13 12.3285 12.3284 13 11.5 13C10.6716 13 10 12.3285 10 11.5C10 10.6716 10.6716 10 11.5 10C12.3284 10 13 10.6716 13 11.5Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
          Share Profile
        </Button>
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
