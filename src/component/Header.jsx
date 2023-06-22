import { Link } from "react-router-dom";
import { Auth } from "./Auth";
import { NewPost } from "./NewPost";
import { useState } from "react";

export const Header = ({ addPost }) => {
  // Añadido botón para mostrar/publicar
  const [showNewPostButton, setShowNewPostButton] = useState(false);

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

      <button onClick={toggleNewPostButton}>Postear</button>

      {showNewPostButton && <NewPost addPost={addPost} />}
    </header>
  );
};
