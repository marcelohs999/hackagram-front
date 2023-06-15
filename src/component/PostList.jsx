import PropTypes from 'prop-types';
import { Post } from './Post';

export const PostList = ({ posts }) => {
  return posts.length ? (
    <ul>
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <Post post={post} />
          </li>
        );
      })}
    </ul>
  ) : (
    <p>Aún no hay ningún posteo</p>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

  
  
  
  
  