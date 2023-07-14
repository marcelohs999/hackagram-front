import { Link } from "react-router-dom";
import "./styles/User.css";
import defaultAvatar from "../../avatar/avatar.jpg";

export const User = ({ username }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  console.log(username?.avatar);

  const userAvatar = username?.avatar
    ? `${backendURL}/uploads/avatars/${username.avatar}`
    : defaultAvatar;

  return (
    <article className="user-search-container">
      {username?.username && (
        <p className="post-user-top">
          <Link to={`/user/${username.username}`}>{username.username}</Link>{" "}
        </p>
      )}

      <div>
        <img src={userAvatar} alt="Avatar del user" />
      </div>
    </article>
  );
};
