import PropTypes from 'prop-types';
import { Post } from './Post';

export const PostList = ({ posts }) => {
 
  
  return posts.length ? (
    <ul>
      {posts.map((post) => {
        if (post && post.id) { // Verifica si el objeto post existe y tiene la propiedad id
          return (
            <li key={post.id}>
              <Post post={post} />
            </li>
          );
        }
        return null;
      })}
    </ul>
  ) : (
    <p>Aún no hay ningún posteo</p>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};
