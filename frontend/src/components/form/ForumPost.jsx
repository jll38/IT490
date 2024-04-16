import React from "react";
import { isoToReadableDate } from "./../../lib/DateTime";
import { ThickArrowUpIcon } from "@radix-ui/react-icons";
import { ThickArrowDownIcon } from "@radix-ui/react-icons";
import { BACKEND } from "../../lib/constants";

export function ForumPost({ post }) {
  const [vote, setVote] = React.useState(0);
  const user_id = Number(localStorage.getItem("user_id"));
  const isFirstRender = React.useRef(true);
  const [totalVotes, setTotalVotes] = React.useState(0);
  const handleUpVote = () => {
    if (vote === 1) {
      setVote(0);
    } else {
      setVote(1);
    }
  };

  const handleDownVote = () => {
    if (vote === -1) {
      setVote(0);
    } else {
      setVote(-1);
    }
  };

  React.useEffect(() => {
    console.log(vote);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      //Implement fetch for retrieve upvotes for post.
      return; // Skip the effect on the first render
    }
    fetch(`${BACKEND}/api/forum/upvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        post_id: post.post_id,
        vote
      }),
    });
  }, [vote]);

  return (
    <div className="flex items-center w-full">
      <div className="flex flex-col items-center">
        <button onClick={handleUpVote}>
          <ThickArrowUpIcon color={vote === 1 ? "orange" : "gray"} />
        </button>
        <div>{totalVotes + vote}</div>
        <button onClick={handleDownVote}>
          <ThickArrowDownIcon color={vote === -1 ? "blue" : "gray"} />
        </button>
      </div>
      <a
        href={`/forum/${post.post_id}`}
        key={post.post_id}
        className="w-full block border-b border-gray-200 py-4 hover:bg-gray-100 px-2"
      >
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="text-sm text-gray-500">
          Posted by u/{post.author} on {isoToReadableDate(post.created_at)}
        </p>
        <p className="mt-2">{post.content}</p>
      </a>
    </div>
  );
}
