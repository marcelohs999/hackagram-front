import { useParams } from "react-router-dom";
import usePost from "../hooks/usePost";
import { ErrorMessage } from "../component/ErrorMessage";
import { Post } from "../component/Post";

export const PostPage = () => {
  const { username } = useParams();

  const { posts, loading, error} = usePost(username);
 
  

  if (loading) return <p>Cargando posts...</p>;
  if (error) return <ErrorMessage />;

  return (
    <section>
      <h1>Publicaciones de {username}</h1>
      
      {posts.map((post) => (
       <Post key={post.id} post={post} />
      ))}
      
    </section>
  );
  
};
