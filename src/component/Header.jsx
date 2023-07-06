import { Link } from "react-router-dom";
import { Auth } from "./Auth";
import "./styles/Header.css";

export const Header = ({}) => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="h1-text-container">
          <Link to="/"> HACKAGRAM </Link>
        </h1>

        <nav className="auth-container">
          <Auth />
        </nav>
      </div>
    </header>
  );
};
