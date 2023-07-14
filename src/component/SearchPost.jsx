import { Link } from "react-router-dom";
import "./styles/SearchPost.css";

export const SearchPost = ({ post }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const imageName = post?.post_image?.split(".")[0];

  return (
    <article className="post-search-container">
      {post?.post_image && (
        <div>
          <Link to={`/p/${imageName}`}>
            <img
              src={`${backendURL}/uploads/${post.post_image}`}
              alt="Imagen del post"
            />
          </Link>
        </div>
      )}

      {post?.post_text && (
        <p className="initial-post-text">
          <Link to={`/user/${post.username}`}>{post.username}</Link>:{" "}
          {post.post_text}
        </p>
      )}
    </article>
  );
};
