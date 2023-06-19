import { useParams } from "react-router-dom";
import usePost from "../hooks/usePost";
import { ErrorMessage } from "../component/ErrorMessage";
import { Post } from "../component/Post";
import { NewPost } from "../component/NewPost";

export const PostPage = () => {
  const { username } = useParams();

  const { posts, loading, error, addPost } = usePost(username);

  if (loading) return <p>Cargando posts...</p>;
  if (error) return <ErrorMessage />;

  return (
    <section>
      <h1>Posts from {username}</h1>
      <NewPost addPost={addPost} />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
};
