import React from "react";
import { isoToReadableDate } from "./../../lib/DateTime";
import { ThickArrowUpIcon } from "@radix-ui/react-icons";
import { ThickArrowDownIcon } from "@radix-ui/react-icons";

export function ForumPost({ post }) {
  return (
    <div className="flex items-center w-full">
      <div className="flex flex-col items-center">
        <button>
          <ThickArrowUpIcon color="orange" />
        </button>
        <div>0</div>
        <button>
          <ThickArrowDownIcon color="blue"/>
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
