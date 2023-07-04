import { User } from "./User";

export const UserList = ({ username }) => {
  return username.length ? (
    <ul>
      {username.map((user) => {
        if (user && user.id) {
          return (
            <li key={user.id}>
              <User username={user} />
            </li>
          );
        }
        return null;
      })}
    </ul>
  ) : (
    <p>No hay ningun usuario</p>
  );
};
