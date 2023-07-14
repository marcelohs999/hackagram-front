import { useParams } from "react-router-dom";
import usePost from "../hooks/usePost";
import { ErrorMessage } from "../component/ErrorMessage";
import "./styles/PostsPage.css";
import { ProfilePosts } from "../component/ProfilePosts";

export const PostPage = () => {
  const { username } = useParams();

  const { posts, loading, error } = usePost(username);

  if (loading) return <p>Cargando posts...</p>;
  if (error) return <ErrorMessage />;

  return (
    <section>
      {posts.length === 0 ? (
        <h1>{username} aún no ha publicado nada</h1>
      ) : (
        <div>
          <h1>Publicaciones de {username}</h1>
          <div className="image-container">
            {posts.map((post) => (
              <ProfilePosts key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
