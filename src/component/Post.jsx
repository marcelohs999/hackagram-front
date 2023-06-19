import PropTypes from 'prop-types';

export const Post = ({ post }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
 

  return (
    <article>
      {post.post_image && (
        <img src={`${backendURL}/uploads/${post.post_image}`} alt="Imagen del post" />
      )}
      {post.post_text && <p>{post.post_text}</p>}
      <p>By {post.username} on {new Date(post.created_at). toLocaleString()}</p>
      <p>Likes {post.likes}</p>
      <p>{post.comments}</p>
     

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
    comments: PropTypes.array,
  }),
};


