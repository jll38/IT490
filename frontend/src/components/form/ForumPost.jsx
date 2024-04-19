import React from "react";
import { isoToReadableDate } from "./../../lib/DateTime";
import { ThickArrowUpIcon, ThickArrowDownIcon } from "@radix-ui/react-icons";
import { BACKEND } from "../../lib/constants";

export function ForumPost({ post }) {
  const [vote, setVote] = React.useState(post.current_user_vote || 0);
  const user_id = Number(localStorage.getItem("user_id"));
  const [totalVotes, setTotalVotes] = React.useState(post.upvotes - post.downvotes);

  const handleUpVote = () => {
    if (vote === 1) {
      handleVote(0, -1);  // Reset to no vote, decrease total votes if vote was up
    } else {
      handleVote(1, vote === 0 ? 1 : 2); // New upvote, increase votes. If it was downvoted before, adjust by 2
    }
  };

  const handleDownVote = () => {
    if (vote === -1) {
      handleVote(0, 1); // Reset to no vote, increase total votes if vote was down
    } else {
      handleVote(-1, vote === 0 ? -1 : -2); // New downvote, decrease votes. If it was upvoted before, adjust by 2
    }
  };

  const handleVote = (newVote, voteChange) => {
    setVote(newVote);
    setTotalVotes(totalVotes + voteChange);

    fetch(`${BACKEND}/api/forum/upvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        post_id: post.post_id,
        vote: newVote,
      }),
    });
  };

  return (
    <div className="flex items-center w-full">
      <div className="flex flex-col items-center">
        <button onClick={handleUpVote}>
          <ThickArrowUpIcon color={vote === 1 ? "orange" : "gray"} />
        </button>
        <div>{totalVotes}</div>
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
