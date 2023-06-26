import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getPostByNameFromUserService } from "../services";

export const Post = ({ post }) => {
  console.log(post)
  const backendURL = import.meta.env.VITE_BACKEND;
  const imageName = post?.post_image?.split(".")[0]; // Verificación de post_image

  return (
    <article>
      {post?.post_image && (
        <div>
          <Link
            to={`/p/${imageName}`}
            onClick={() => getPostByNameFromUserService(imageName)}
          >
            <img
              src={`${backendURL}/uploads/${post.post_image}`}
              alt="Imagen del post"
            />
          </Link>
        </div>
      )}
      {post?.post_text && <p>{post.post_text}</p>}
      {post?.username && (
        <p>
          By {post.username} on {new Date(post.created_at).toLocaleString()}
        </p>
      )}
      <p>Likes {post?.likes}</p>
      <ul>
        {post?.comments &&
          post.comments.map((comment) => (
            <li key={comment.id}>{comment.comment}</li>
          ))}
      </ul>
    </article>
  );
};


Post.propTypes = {
  post: PropTypes.shape({
    post_image: PropTypes.string.isRequired,
    post_text: PropTypes.string,
    username: PropTypes.string,//se quito el is Required porque sino no funciona el ver un usuario por su username. Gestionar el error si el usuario es undefined
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
