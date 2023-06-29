import PropTypes from "prop-types";
import { Post } from "./Post";
import "./styles/PostList.css";

export const PostList = ({ posts, removePost }) => {
  return posts.length ? (
    <ul>
      {posts.map((post) => {
        if (post && post.id) {
          return (
            <li key={post.id}>
              <Post post={post} removePost={removePost} />
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
