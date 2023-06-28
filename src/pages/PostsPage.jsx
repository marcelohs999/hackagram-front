import { useParams } from "react-router-dom";
import usePost from "../hooks/usePost";
import { ErrorMessage } from "../component/ErrorMessage";
import { Post } from "../component/Post";
import "./styles/PostPage.css";
import { ProfilePosts } from "../component/ProfilePosts";
// NOTA - Corregir iconos de Post.css que se come aquí

export const PostPage = () => {
  const { username } = useParams();

  const { posts, loading, error } = usePost(username);

  if (loading) return <p>Cargando posts...</p>;
  if (error) return <ErrorMessage />;

  return (
    <section>
      <h1>Publicaciones de {username}</h1>
      <div className="image-container">
        {posts.map((post) => (
          <ProfilePosts key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};
