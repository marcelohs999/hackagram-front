import PropTypes from "prop-types";
import { Post } from "./Post";
import "./styles/PostList.css";

export const PostList = ({ posts }) => {
  return posts.length ? (
    <ul>
      {posts.map((post) => {
        if (post && post.id) {
          // Verifica si el objeto post existe y tiene la propiedad id
          return (
            <li key={post.id}>
              <Post post={post} />
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

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};
