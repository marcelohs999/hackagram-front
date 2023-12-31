import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
// Sustitución del window.alert por un toast más chulo
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import defaultAvatar from "../../avatar/avatar.jpg";

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

  function getTimeAgo(created_at) {
    const currentTime = new Date();
    const postTime = new Date(created_at);
    const timeDiff = Math.abs(currentTime - postTime);

    const seconds = Math.floor(timeDiff / 1000);

    if (seconds < 60) {
      return `hace ${seconds} seg`;
    } else {
      const minutes = Math.floor(timeDiff / (1000 * 60));

      if (minutes < 60) {
        return `hace ${minutes} min`;
      } else {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));

        if (hours < 24) {
          if (hours === 1) {
            return `hace ${hours} hora`;
          } else {
            return `hace ${hours} horas`;
          }
        } else {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          if (days === 1) {
            return `hace ${days} día`;
          } else {
            return `hace ${days} días`;
          }
        }
      }
    }
  }

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
      toast.info("No puedes enviar un comentario sin texto. ¡Escribe!", {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

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
      {!user && post?.post_image && (
        <>
          {post?.username && (
            <p className="post-user-top">
              Creado por{" "}
              <Link to={`/user/${post.username}`}>{post.username}</Link>{" "}
              {getTimeAgo(post.created_at)}
            </p>
          )}
          <div>
            <Link to={`/p/${imageName}`}>
              <img
                src={`${backendURL}/uploads/${post.post_image}`}
                alt="Imagen del post"
              />
            </Link>
          </div>
        </>
      )}

      {user && (
        <>
          {post?.username && (
            <p className="post-user-top">
              Creado por{" "}
              <Link to={`/user/${post.username}`}>{post.username}</Link> el{" "}
              {new Date(post.created_at).toLocaleString()}
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
            {post && (
              <LikeButton
                postId={post.id}
                handleLike={handleLike}
                likedByUser={likedByUser}
              />
            )}

            {user ? (
              <img
                src={messageIcon}
                alt="Icono de Mensajes"
                onClick={toggleInputComment}
              ></img>
            ) : null}

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

          {copySuccess && (
            <p className="url-copy">¡URL copiada correctamente!</p>
          )}
          {likes > 1 ? (
            <p className="likes-count">Le gusta a {likes} personas</p>
          ) : likes === 1 ? (
            <p className="likes-count">Tan solo le gusta a una persona</p>
          ) : (
            <p className="likes-count">No le ha gustado a nadie aún</p>
          )}

          {post?.post_text && (
            <p className="initial-post-text">
              <span className="post-user-bold">{post.username}</span>:{" "}
              {post.post_text}
            </p>
          )}

          {showInputComment && (
            <div className="comment-input-container">
              <form onSubmit={loadComments}>
                <input
                  type="text"
                  name="comment"
                  placeholder="Escribe tu comentario"
                  value={inputComment}
                  onChange={(e) => setInputComment(e.target.value)}
                />
                <button className="comment-submit-container">Enviar</button>
              </form>
            </div>
          )}

          {comments.length > 0 && (
            <div>
              <button onClick={() => setShowAllComments(!showAllComments)}>
                {showAllComments
                  ? "Ocultar comentarios"
                  : "Mostrar más comentarios"}
              </button>
              <div className="users-comments">
                <ul className="comments-list">
                  {showAllComments
                    ? comments.map((comment) => (
                        <li key={comment.id} className="comment">
                          <div className="comment-header">
                            <span className="post-user-bold">
                              <img
                                src={
                                  comment.avatar
                                    ? `${backendURL}/uploads/avatars/${comment.avatar}`
                                    : defaultAvatar
                                }
                                alt="avatar"
                                className="comment-avatar"
                              />{" "}
                              {comment.username}
                            </span>{" "}
                            <span className="time-comment-italic">
                              {getTimeAgo(comment.created_at)}
                            </span>
                          </div>
                          <div className="comment-content">
                            {comment.comment}
                          </div>
                        </li>
                      ))
                    : comments.slice(0, 3).map((comment) => (
                        <li key={comment.id} className="comment">
                          <div className="comment-header">
                            <span className="post-user-bold">
                              <img
                                src={
                                  comment.avatar
                                    ? `${backendURL}/uploads/avatars/${comment.avatar}`
                                    : defaultAvatar
                                }
                                alt="avatar"
                                className="comment-avatar"
                              />{" "}
                              {comment.username}
                            </span>{" "}
                            <span className="time-comment-italic">
                              {getTimeAgo(comment.created_at)}
                            </span>
                          </div>
                          <div className="comment-content">
                            {comment.comment}
                          </div>
                        </li>
                      ))}
                </ul>
              </div>
            </div>
          )}

          <ToastContainer
            position="bottom-center"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </>
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
