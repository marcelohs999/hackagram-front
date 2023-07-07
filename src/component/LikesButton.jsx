import React, { useState } from "react";
import heartIcon from "../../logos/heart.svg";
import likeIcon from "../../logos/like.svg";
import "./styles/LikesButton.css";

export const LikeButton = ({ handleLike, likedByUser }) => {
  const toggleLike = () => {
    handleLike();
  };
  return (
    <div
      className={`button-like-img ${likedByUser ? "liked" : ""}`}
      onClick={toggleLike}
    >
      <img src={likedByUser ? likeIcon : heartIcon} alt="Icono de Like" />
    </div>
  );
};
