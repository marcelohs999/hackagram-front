import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchImageService } from "../services";
import "./styles/Sidebar.css";

import instaLogo from "../../logos/instagram.svg";
import homeIcon from "../../logos/home.svg";
import searchIcon from "../../logos/search.svg";
import createIcon from "../../logos/plus-square.svg";
import heartIcon from "../../logos/heart.svg";
import profileIcon from "../../logos/settings.svg";

const Sidebar = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search/${searchText}`);
  };

  //   const handleSearch = async () => {
  //     try {
  //       const searchData = await searchImageService({ post_text: "buscar" });
  //       console.log(searchData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

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
        <li className="sidebar-item" onClick={handleSearch}>
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
