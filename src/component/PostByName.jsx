import PropTypes from "prop-types";
import { Post2 } from "./Post2";

export const PostByName = ({ post }) => {
  // Asegurémonos de que post sea una matriz antes de realizar el map
  const posts = post || [];

  return posts.length ? (
    <ul>
      {posts.map((post) => {
        if (post && post.id) {
          // Verifica si el objeto post existe y tiene la propiedad id
          return (
            <li key={post.id}>
              <Post2 post={post} />
            </li>
          );
        }
        return null;
      })}
    </ul>
  ) : (
    <p>Aún no hay ninguna publicación</p>
  );
};

PostByName.propTypes = {
  post: PropTypes.array.isRequired,
};
