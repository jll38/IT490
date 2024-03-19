import React from "react";

// Mock data
const forumPosts = [
  {
    id: 1,
    title: "How to make a simple cake?",
    author: "JaneDoe123",
    datePosted: "2023-03-01",
    content:
      "Hello everyone! I'm looking for an easy recipe to make a cake. Any suggestions?",
  },
  {
    id: 2,
    title: "Gardening tips for beginners",
    author: "GreenThumb2023",
    datePosted: "2023-03-05",
    content:
      "Can anyone share gardening tips for someone just getting started?",
  },
  // Add more posts as needed
];

const ForumPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  // Filter posts based on the search term
  const filteredPosts =
    searchTerm.length === 0
      ? forumPosts
      : forumPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );

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
      <div className="forum-posts">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <a
              href={`/forum/${post.id}`}
              key={post.id}
              className="block border-b border-gray-200 py-4 hover:bg-gray-100 px-2"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">
                Posted by {post.author} on {post.datePosted}
              </p>
              <p className="mt-2">{post.content}</p>
            </a>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default ForumPage;
