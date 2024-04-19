import { ForumPost } from "./../../components/form/ForumPost";
import React, { useEffect } from "react";
import { BACKEND } from "../../lib/constants";

const ForumPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [posts, setPosts] = React.useState([]);
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const user_id = Number(localStorage.getItem("user_id"));

  useEffect(() => {
    setFilteredPosts(
      searchTerm.length === 0
        ? posts
        : posts.filter(
            (post) =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              post.content.toLowerCase().includes(searchTerm.toLowerCase())
          )
    );
  }, [posts, searchTerm]);

  React.useEffect(() => {
    fetch(`${BACKEND}/api/forum/posts?user_id=${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        console.log(data);
      });
  }, [user_id]);

  return (
    <div className="forum-page container mx-auto my-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Forum Posts</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          className="border border-gray-300 p-2 w-full"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <a
          href="/forum/create-post"
          className="inline-block bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition-colors"
        >
          New Post
        </a>
      </div>
      {/* Posts List */}
      <div className="forum-posts w-full">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <ForumPost post={post} />)
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default ForumPage;
