import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({
    title: "Title",
    author: "Joe Mama",
    date: "May 13th, 2002c",
    content: "Hello there",
  });
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch post and comments
  //   useEffect(() => {
  //     setIsLoading(true);
  //     // Fetch post details
  //     fetch(`/api/posts/${postId}`) // Adjust the API endpoint as needed
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setPost(data);
  //         // Simulate fetching comments for the post
  //         return fetch(`/api/posts/${postId}/comments`); // Adjust the API endpoint as needed
  //       })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setComments(data);
  //         setIsLoading(false);
  //       })
  //       .catch((error) => {
  //         setError(error.message);
  //         setIsLoading(false);
  //       });
  //   }, [postId]);

  const handleSubmitComment = (event) => {
    event.preventDefault();
    // Simulate posting a new comment
    console.log("Submitting comment", newComment);
    // Here you would typically make an API call to submit the new comment
    // Then fetch or update the comments list to include the new comment
    setNewComment(""); // Reset comment input after submission
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  //if (!post) return <div>Post not found</div>;

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-2">
        Posted by {post.author} on {post.date}
      </p>
      <div className="mb-4">{post.content}</div>
      <div className="comments-section mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 py-2">
              <p className="text-gray-600">{comment.text}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        <form onSubmit={handleSubmitComment} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border p-2 w-full mb-2"
            placeholder="Add a comment..."
            rows="3"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition-colors"
          >
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDetailPage;
