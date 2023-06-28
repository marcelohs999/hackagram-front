import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getPostByNameFromUserService } from "../services";
import "./styles/Post.css";

// Iconos
import heartIcon from "../../logos/heart.svg";
import messageIcon from "../../logos/message.svg";
import sendIcon from "../../logos/send.svg";
import bookmarkIcon from "../../logos/bookmark.svg";

export const Post = ({ post }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const imageName = post?.post_image?.split(".")[0];
  console.log(post.created_at);
  return (
    <article>
      {post?.username && (
        <p className="post-user-top">
          Creado por <Link to={`/user/${post.username}`}>{post.username}</Link>{" "}
          el {new Date(post.created_at).toLocaleString()}
        </p>
      )}
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
      <p className="likes-count">Likes = {post?.likes}</p>
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
