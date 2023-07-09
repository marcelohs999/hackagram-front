import PropTypes from "prop-types";
import { SearchPost } from "./SearchPost";

export const SearchPostList = ({ posts }) => {
  return posts.length ? (
    <ul>
      {posts.map((post) => {
        if (post && post.id) {
          return (
            <li key={post.id}>
              <SearchPost post={post} />
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

SearchPostList.propTypes = {
  posts: PropTypes.array.isRequired,
};
