import React, { useEffect, useState } from "react";
import { ForumPost } from "./../../components/form/ForumPost";
import { BACKEND } from "../../lib/constants";
import { useParams } from 'react-router-dom';
import { isoToReadableDate } from '../../lib/DateTime';


const ForumPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

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

  useEffect(() => {
    fetch(`${BACKEND}/api/forum/posts?user_id=${User.user_id}`)
      .then((res) => res.json())
      .then((data) => {
        // Sort posts by total votes (upvotes - downvotes) in descending order
        const sortedPosts = data.sort((a, b) => {
          const votesA = a.upvotes - a.downvotes;
          const votesB = b.upvotes - b.downvotes;
          return votesB - votesA; // For descending order
        });
        setPosts(sortedPosts);
      });
  }, [User.user_id]);

  return (
    <div className="forum-page container mx-auto my-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Forum Posts</h1>
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
      <div className="forum-posts w-full">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <ForumPost post={post} key={post.post_id} />)
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default ForumPage;
