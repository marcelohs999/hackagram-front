import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./styles/Auth.css";

export const Auth = () => {
  const { user, logout } = useContext(AuthContext);
  const backendURL = import.meta.env.VITE_BACKEND;

  return user ? (
    <div className="auth-content">
      <Link to="/profile" className="url-profile-container">
        <img
          className="avatar-container"
          src={
            user.avatar
              ? `${backendURL}/uploads/avatars/${user.avatar}`
              : `../../avatar/avatar.jpg`
          }
          alt="Imagen del avatar"
        />
      </Link>
      <p className="auth-text-container">
        Conectado como {user.username}.
        <button className="logout-container" onClick={() => logout()}>
          Logout
        </button>
      </p>
    </div>
  ) : (
    <ul>
      <li>
        <Link to="/user"> Registro </Link>{" "}
      </li>
      <li>
        <Link to="/login"> Login </Link>{" "}
      </li>
    </ul>
  );
};
