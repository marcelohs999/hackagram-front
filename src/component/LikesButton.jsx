import React, { useState } from "react";
import { Link } from "react-router-dom";
import heartIcon from "../../logos/heart.svg";
import likeIcon from "../../logos/like.svg";

export const LikeButton = ({ handleLike, likedByUser }) => {
  const toggleLike = () => {
    handleLike();
  };
  console.log(likedByUser);
  return (
    <div>
      <Link
        to="#"
        className={`button-like-img ${likedByUser ? "liked" : ""}`}
        onClick={toggleLike}
      >
        <img src={likedByUser ? likeIcon : heartIcon} alt="Icono de Like" />
      </Link>
    </div>
  );
};
