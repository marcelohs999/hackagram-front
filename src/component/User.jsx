import { Link } from "react-router-dom";

export const User = ({ username }) => {
  const backendURL = import.meta.env.VITE_BACKEND;

  return (
    <article>
      {username?.username && (
        <p className="post-user-top">
          <Link to={`/user/${username.username}`}>{username.username}</Link>{" "}
        </p>
      )}

      {username?.avatar && (
        <div>
          <img
            src={`${backendURL}/uploads/avatars/${username.avatar}`}
            alt="Avatar del user"
          />
        </div>
      )}
    </article>
  );
};
