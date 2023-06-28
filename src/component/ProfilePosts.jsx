import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getPostByNameFromUserService } from "../services";
import "./styles/Post.css";
// Componente que muestra todas las publicaciones del USERNAME
export const ProfilePosts = ({ post }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const imageName = post?.post_image?.split(".")[0];

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
    </article>
  );
};

// Post.propTypes = {
//   post: PropTypes.shape({
//     post_image: PropTypes.string.isRequired,
//     post_text: PropTypes.string,
//     username: PropTypes.string,
//     created_at: PropTypes.string.isRequired,
//     likes: PropTypes.number,
//     comments: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         comment: PropTypes.string.isRequired,
//       })
//     ),
//   }),
// };
