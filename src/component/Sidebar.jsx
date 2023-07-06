import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles/Sidebar.css";

import instaLogo from "../../logos/instagram.svg";
import homeIcon from "../../logos/home.svg";
import searchIcon from "../../logos/search.svg";
import createIcon from "../../logos/plus-square.svg";
import heartIcon from "../../logos/heart.svg";
import profileIcon from "../../logos/settings.svg";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <p className="hacka-bartext">Hackagram</p>
      <Link to="/">
        <img src={instaLogo} alt="Hackagram" className="hackagram-logo" />
      </Link>
      <ul className="sidebar-nav">
        <Link to="/">
          <li className="sidebar-item">
            <img src={homeIcon} alt="Home" className="sidebar-icon" />{" "}
            <span className="text-from-sidebar">Inicio</span>
          </li>
        </Link>
        <Link to="/search">
          <li className="sidebar-item">
            <img src={searchIcon} alt="search" className="sidebar-icon" />{" "}
            <span className="text-from-sidebar">Búsqueda</span>
          </li>
        </Link>
        {user ? (
          <Link to="/image">
            <li className="sidebar-item">
              <img src={createIcon} alt="create" className="sidebar-icon" />{" "}
              <span className="text-from-sidebar">Crear</span>
            </li>
          </Link>
        ) : null}
        <li className="sidebar-item">
          <img src={heartIcon} alt="notifications" className="sidebar-icon" />{" "}
          <span className="text-from-sidebar">Notificaciones</span>
        </li>
        {user ? (
          <Link to="/profile">
            <li className="sidebar-item">
              <img src={profileIcon} alt="profile" className="sidebar-icon" />{" "}
              <span className="text-from-sidebar">Perfil</span>
            </li>
          </Link>
        ) : null}
      </ul>
    </div>
  );
};

export default Sidebar;
