import { Link } from "react-router-dom";
import { Auth } from "./Auth";
import "./styles/Header.css";

export const Header = ({}) => {
  return (
    <header className="header">
      <div className="header-container">
        <nav className="auth-container">
          <Auth />
        </nav>

        <h1 className="h1-text-container">
          <Link to="/" className="link-text">
            {" "}
            HACKAGRAM{" "}
          </Link>
        </h1>
      </div>
    </header>
  );
};
