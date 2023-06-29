import { Link } from "react-router-dom";
import heartIcon from "../../logos/heart.svg";

export const LikeButton = ({ handleLike }) => {
  return (
    <div>
      {/* <button className="button-like-img" onClick={handleLike}>
        <img src={heartIcon} alt="Icono de Like"></img>
      </button> ORIGINAL */}
      <Link to="#" className="button-like-img" onClick={handleLike}>
        <img src={heartIcon} alt="Icono de Like"></img>
      </Link>
    </div>
  );
};
