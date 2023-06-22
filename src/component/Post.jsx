import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Post = ({ post, user_id }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const [error, setError] = useState("");

  const deletePost = async (id) => {
    try {
      await deletePostService({ id, token });
    } catch (error) {
      SetError(error.message);
    }
  };

  return (
    <article>
      {post.post_image && (
        <img
          src={`${backendURL}/uploads/${post.post_image}`}
          alt="Imagen del post"
        />
      )}
      {post.post_text && <p>{post.post_text}</p>}
      <p>
        By {post.username} on {""}
        <Link to={`/src/component/Post.jsx${post.username}`}>
          {new Date(post.created_at).toLocaleString()}
        </Link>
      </p>
      <p>Likes {post.likes}</p>
      <ul>
        {post.comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
      {user_id === post.user_id ? (
        <section>
          <button onClick={() => deletePost(user_id)}>Delete Post</button>
          {error ? <p>{error}</p> : null}
        </section>
      ) : null}
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    post_image: PropTypes.string.isRequired,
    post_text: PropTypes.string,
    username: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    likes: PropTypes.number,
    user_id: PropTypes.number.isRequired,

    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        user_id: PropTypes.number.isRequired,
      })
    ),
  }),
  user_id: PropTypes.number.isRequired,
};
