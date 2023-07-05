import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Auth = () => {
  const { user, logout } = useContext(AuthContext);

  return user ? (
    <p>
      El usuario esta conectado como {user.username}
      <Link to="/profile">
        {" "}
        <img
          src={
            user.avatar
              ? `../../avatar/${user.avatar}`
              : `../../avatar/avatar.jpg`
          }
          alt="Imagen del avatar"
        />
      </Link>{" "}
      <button onClick={() => logout()}>Logout</button>
    </p>
  ) : (
    <ul>
      <li>
        <Link to="/user"> Register </Link>{" "}
      </li>
      <li>
        <Link to="/login"> Login </Link>{" "}
      </li>
    </ul>
  );
};
