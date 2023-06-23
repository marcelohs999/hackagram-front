import React from "react";
import { Link } from "react-router-dom";
import "./styles/Sidebar.css";

import instaLogo from "../../logos/instagram.svg";
import homeIcon from "../../logos/home.svg";
import searchIcon from "../../logos/search.svg";
import createIcon from "../../logos/plus-square.svg";
import heartIcon from "../../logos/heart.svg";
import profileIcon from "../../logos/settings.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <p>Hackagram</p>
      <Link to="/">
        <img src={instaLogo} alt="Hackagram" className="hackagram-logo" />
      </Link>
      <ul className="sidebar-nav">
        <Link to="/">
          <li className="sidebar-item">
            <img src={homeIcon} alt="Home" className="sidebar-icon" /> Inicio
          </li>
        </Link>
        <li className="sidebar-item">
          <img src={searchIcon} alt="search" className="sidebar-icon" />{" "}
          Búsqueda
        </li>
        <li className="sidebar-item">
          <img src={createIcon} alt="create" className="sidebar-icon" /> Crear
        </li>
        <li className="sidebar-item">
          <img src={heartIcon} alt="notifications" className="sidebar-icon" />{" "}
          Notificaciones
        </li>
        <li className="sidebar-item">
          <img src={profileIcon} alt="profile" className="sidebar-icon" />{" "}
          Perfil
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
