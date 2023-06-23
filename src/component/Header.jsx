import { Link } from "react-router-dom";
import { Auth } from "./Auth";
import { NewPost } from "./NewPost";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import usePosts from "../hooks/usePosts";

export const Header = ({}) => {
  // Añadido botón para mostrar/publicar
  const [showNewPostButton, setShowNewPostButton] = useState(false);
  const { user } = useContext(AuthContext);
  const { addPost } = usePosts();

  const toggleNewPostButton = () => {
    setShowNewPostButton(!showNewPostButton);
  };
  // Fin del código de mostrar/publicar
  return (
    <header>
      <h1>
        <Link to="/"> HACKAGRAM </Link>
      </h1>

      <nav>
        <Auth />
      </nav>
      {user ? <button onClick={toggleNewPostButton}>Postear</button> : null}

      {showNewPostButton && <NewPost addPost={addPost} />}
    </header>
  );
};
