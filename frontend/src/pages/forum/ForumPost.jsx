import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isoToReadableDate } from "../../lib/DateTime";
import { BACKEND } from "../../lib/constants";
import { User } from "../../lib/token";


const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredComments, setFilteredComments] = useState([]);

  

  useEffect(() => {
  
    fetch(`${BACKEND}/api/forum/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setFilteredComments(data);
      })
      .catch(err => setError(err.toString()));
  }, [id]);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    // Post the new comment to the backend
    fetch(`${BACKEND}/api/forum/comment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: id,
        content: newComment,
        user_id: User.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Comment posted successfully");
          setComments([...comments, { content: newComment, user: User }]);
          setNewComment("");
        } else {
          setError(data.detail || "Failed to post comment");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleDownvoteComment = (commentId) => {
    fetch(`${BACKEND}/api/forum/posts/${id}/comments/downvote/${commentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(updatedComment => {
      const updatedComments = comments.map(comment =>
        comment.id === updatedComment.id ? updatedComment : comment
      );
      setComments(updatedComments);
      setFilteredComments(updatedComments);
    })
    .catch(err => setError(err.toString()));
  };
const handleDownvotePost = () => {
    fetch(`${BACKEND}/api/forum/posts/downvote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(updatedPost => {
      setPost(updatedPost);
    })
    .catch(err => setError(err.toString()));
  };

  const handleUpvoteComment = (commentId) => {
    fetch(`${BACKEND}/api/forum/posts/${id}/comments/upvote/${commentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(updatedComment => {
      const updatedComments = comments.map(comment =>
        comment.id === updatedComment.id ? updatedComment : comment
      );
      setComments(updatedComments);
      setFilteredComments(updatedComments);
    })
    .catch(err => setError(err.toString()));
  };
  if (!post) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  //if (!post) return <div>Post not found</div>;

  return (
    post && (
      <div className="container mx-auto my-8 p-4">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-2">
          Posted by {post.author} on {isoToReadableDate(post.created_at)}
        </p>
        <div className="mb-4">{post.content}</div>
        <div className="comments-section mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 py-2">
                <p className="text-gray-600">{comment.content}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
          {User ? (
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
          ) : (
            <p>Please log in to comment on this post</p>
          )}
        </div>
      </div>
    )
  );
};

export default PostDetailPage;
