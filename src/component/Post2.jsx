import PropTypes from "prop-types";

export const Post2 = ({ post }) => {
  const backendURL = import.meta.env.VITE_BACKEND;

  // Asegurémonos de que post.comments sea una matriz antes de realizar el map
  const comments = post.comments || [];
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
        By {post.username} on {new Date(post.created_at).toLocaleString()}
      </p>
      <p>Likes {post.likes}</p>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </article>
  );
};

Post2.propTypes = {
  post: PropTypes.shape({
    post_image: PropTypes.string.isRequired,
    post_text: PropTypes.string,
    username: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    likes: PropTypes.number,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
      })
    ),
  }),
};
