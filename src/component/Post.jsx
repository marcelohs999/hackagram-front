import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  deletePostService,
  getPostByNameFromUserService,
  likeImageService,
} from "../services";
import "./styles/Post.css";

// Iconos
import heartIcon from "../../logos/heart.svg";
import messageIcon from "../../logos/message.svg";
import sendIcon from "../../logos/send.svg";
import bookmarkIcon from "../../logos/bookmark.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LikeButton } from "./LikesButton";

export const Post = ({ post, removePost }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const imageName = post?.post_image?.split(".")[0];
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [likes, setLikes] = useState("");

  const deletePost = async (id) => {
    try {
      await deletePostService(id, token);
      removePost(id);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLike = async () => {
    try {
      const data = await likeImageService(token, post.id);

      setLikes(data.likes);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article>
      {post?.username && (
        <p className="post-user-top">
          Creado por <Link to={`/user/${post.username}`}>{post.username}</Link>{" "}
          el {new Date(post.created_at).toLocaleString()}
        </p>
      )}

      {user && user.id === post.user_id ? (
        <section>
          <button
            onClick={() => {
              deletePost(post.id);
            }}
          >
            Delete
          </button>
          {error ? <p>{error}</p> : null}
        </section>
      ) : null}

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

      {user
        ? post && <LikeButton postId={post.id} handleLike={handleLike} />
        : null}

      <div className="post-icons-below">
        <img src={heartIcon} alt="Icono de Like"></img>
        <img src={messageIcon} alt="Icono de Mensajes"></img>
        <img src={sendIcon} alt="Icono de Compartir"></img>
        <img
          src={bookmarkIcon}
          alt="Icono de Marcadores"
          className="post-icons-bookmark"
        ></img>
      </div>
      <p className="likes-count">Likes = {likes}</p>
      {/* NOTA: si post_text es muy largo, rompe la posición entre img y resto */}
      {post?.post_text && (
        <p className="initial-post-text">
          <span className="post-user-bold">{post.username}</span>:{" "}
          {post.post_text}
        </p>
      )}
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
    username: PropTypes.string, //se quito el is Required porque sino no funciona el ver un usuario por su username. Gestionar el error si el usuario es undefined
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
