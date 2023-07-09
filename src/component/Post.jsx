import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import {
  deletePostService,
  getPostByNameFromUserService,
  likeImageService,
  postCommentsService,
} from "../services";
import "./styles/Post.css";

// Iconos
import messageIcon from "../../logos/message.svg";
import sendIcon from "../../logos/send.svg";
import trashIcon from "../../logos/trash.svg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LikeButton } from "./LikesButton";

export const Post = ({ post, removePost }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const imageName = post?.post_image?.split(".")[0];
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [likes, setLikes] = useState(post.likes);
  const [likedByUser, setLikedByUser] = useState(post.likedByLoggedUser);
  const [showInputComment, setShowInputComment] = useState(false); // Para desplegar input para comentar
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);
  const [showAllComments, setShowAllComments] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const toggleShare = () => {
    resetCopySuccess();
    setIsShareOpen(!isShareOpen);
  };

  const toggleInputComment = () => {
    setShowInputComment(!showInputComment);
  };

  const loadComments = async (e) => {
    e.preventDefault();

    if (!inputComment) {
      // Evitamos comentarios vacíos
      return;
    }

    try {
      const data = new FormData();
      data.append("comment", inputComment);

      const updatedComments = await postCommentsService({
        token,
        postId: post.id,
        data,
      });

      setComments(updatedComments);
      setInputComment("");
    } catch (error) {
      setError("Error al cargar nuevo comentario");
    }
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoadingComments(true);
        const updatedPost = await getPostByNameFromUserService(imageName);
        setComments(updatedPost.comments);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPostData();
  }, [imageName]);

  const deletePost = async (id) => {
    try {
      await deletePostService(id, token);
      removePost(id);
    } catch (error) {
      setError(error.message);
    }
  };

  const copyPostUrl = () => {
    const postUrl = `${window.location.origin}/p/${imageName}`;
    navigator.clipboard
      .writeText(postUrl)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error al copiar la URL:", error);
        setCopySuccess(false);
      });
  };

  const resetCopySuccess = () => {
    setCopySuccess(false);
  };

  const handleLike = async () => {
    try {
      const data = await likeImageService(token, post.id);

      setLikes(data.likes);
      setLikedByUser(data.likedByLoggedUser);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <article className="post-container">
      {post?.username && (
        <p className="post-user-top">
          Creado por <Link to={`/user/${post.username}`}>{post.username}</Link>{" "}
          el {new Date(post.created_at).toLocaleString()}
        </p>
      )}

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

      <div className="post-icons-below">
        <div className="post-icons-wrapper"></div>
        {user
          ? post && (
              <LikeButton
                postId={post.id}
                handleLike={handleLike}
                likedByUser={likedByUser}
              />
            )
          : null}
        {showInputComment && (
          <div className="comment-input-container">
            <form onSubmit={loadComments}>
              <input
                type="text"
                name="comment"
                placeholder="Escribe tu comentario"
                value={inputComment} // Prueba de ESTADO
                onChange={(e) => setInputComment(e.target.value)}
              />
              <button className="comment-submit-container">Enviar</button>
            </form>
          </div>
        )}

        <img
          src={messageIcon}
          alt="Icono de Mensajes"
          onClick={toggleInputComment}
        ></img>

        <img
          src={sendIcon}
          alt="Icono de Compartir"
          onClick={toggleShare}
        ></img>

        {isShareOpen && (
          <div>
            <button className="share-button" onClick={copyPostUrl}>
              Copiar
            </button>
          </div>
        )}

        <div className="trash-icon-wrapper">
          {user && user.id === post.user_id ? (
            <>
              <img
                className="trash-icon"
                src={trashIcon}
                onClick={() => setShowDeleteConfirmation(true)}
              ></img>
              {error ? <p>{error}</p> : null}
            </>
          ) : null}

          {showDeleteConfirmation && (
            <div className="delete-confirmation">
              <p>¿Estás seguro de que deseas borrar esta publicación?</p>
              <button onClick={() => deletePost(post.id)}>Sí</button>
              <button onClick={() => setShowDeleteConfirmation(false)}>
                No
              </button>
            </div>
          )}
        </div>
      </div>
      {copySuccess && <p className="url-copy">¡URL copiada correctamente!</p>}
      <p className="likes-count">Likes = {likes}</p>
      {post?.post_text && (
        <p className="initial-post-text">
          <span className="post-user-bold">{post.username}</span>:{" "}
          {post.post_text}
        </p>
      )}

      {/* Muestra tres comentarios por defecto y con botón para mostrar todos*/}
      {comments.length > 0 && (
        <div>
          <button onClick={() => setShowAllComments(!showAllComments)}>
            {showAllComments ? "Ocultar comentarios" : "Mostrar comentarios"}
          </button>
          <ul className="users-comments">
            {showAllComments
              ? comments.map((comment) => (
                  <li key={comment.id}>
                    <span className="post-user-bold">{comment.username}</span>:{" "}
                    {comment.comment}
                  </li>
                ))
              : comments.slice(0, 3).map((comment) => (
                  <li key={comment.id}>
                    <span className="post-user-bold">{comment.username}</span>:{" "}
                    {comment.comment}
                  </li>
                ))}
          </ul>
        </div>
      )}
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    post_image: PropTypes.string.isRequired,
    post_text: PropTypes.string,
    username: PropTypes.string,
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
