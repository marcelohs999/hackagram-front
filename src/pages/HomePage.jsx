import { useContext } from "react";
import { ErrorMessage } from "../component/ErrorMessage";
import { PostList } from "../component/PostList";
import { AuthContext } from "../../context/AuthContext";
import usePosts from "../hooks/usePosts";
import loadingGif from "../../logos/loading.gif";
import "./styles/HomePage.css";

export const HomePage = () => {
  const { user } = useContext(AuthContext);
  const { posts, loading, error, removePost } = usePosts();

  if (loading)
    return <img className="loading-img" src={loadingGif} alt="Cargando..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      {user ? (
        <h1>Últimas publicaciones</h1>
      ) : (
        <h2 className="h2-homepage-text">Sin login, poco (o nada) verás...</h2>
      )}
      <PostList
        posts={user ? posts : posts.slice(0, 3)}
        removePost={removePost}
      />
    </section>
  );
};
