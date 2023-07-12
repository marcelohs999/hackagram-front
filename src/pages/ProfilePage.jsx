import { useContext, useState } from "react";
import defaultAvatar from "../../avatar/avatar.jpg";
import { AuthContext } from "../../context/AuthContext";
import { changesAvatarBioService } from "../services";
import "./styles/ProfilePage.css";
import { SettingsUser } from "../component/SettingsUser";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const { user, token, updateUser } = useContext(AuthContext);
  const backendURL = import.meta.env.VITE_BACKEND;
  const [newBio, setNewBio] = useState(user?.bio || "");

  const uploadFile = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = new FormData();
      data.append("newAvatar", e.target.files[0]);

      const avatarData = await changesAvatarBioService({ data, token });

      updateUser({ ...user, avatar: avatarData.avatar });
    } catch (error) {
      setError(error.message);
    }
  };

  const userAvatar = user?.avatar
    ? `${backendURL}/uploads/avatars/${user?.avatar}`
    : defaultAvatar;

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);

      const data = new FormData();

      data.append("newBio", e.target.newBio.value);

      await changesAvatarBioService({ data, token });
      updateUser({ ...user, bio: newBio });
      setEditBio(false);
    } catch (error) {
      setError(error.message);
      setEditBio(false);
    } finally {
      setSending(false);
    }
  };

  const handleBioClick = () => {
    setEditBio(true);
    setNewBio(user?.bio || "");
  };

  return (
    <section className="profile">
      <h2>Perfil</h2>

      <section className="avatar">
        <label htmlFor="newAvatar">
          <img src={userAvatar} alt="avatar" />
          <p>Haz click para cambiar el avatar</p>
          {error ? <p>{error}</p> : null}
        </label>

        <input
          type="file"
          accept="image/*"
          id="newAvatar"
          onChange={uploadFile}
        />
      </section>

      <Link to={`/user/${user?.username}`}>
        <h3>{user.username}</h3>
      </Link>

      {editBio ? (
        <form onSubmit={handleForm}>
          <label htmlFor="newBio"></label>
          <textarea
            value={newBio}
            id="newBio"
            name="newBio"
            cols="15"
            rows="5"
            onChange={(e) => setNewBio(e.target.value)}
          ></textarea>

          <button type="submit" disabled={sending}>
            {sending ? "Enviando..." : "Subir bio"}
          </button>
          {error ? <p>{error}</p> : null}
        </form>
      ) : user?.bio ? (
        <p className="editBio" onClick={handleBioClick}>
          {user.bio}
          <p>Haz click para cambiar la bio</p>
        </p>
      ) : (
        <p className="editBio" onClick={handleBioClick}>
          <p>Haz click para cambiar la bio</p>
        </p>
      )}

      <SettingsUser />
    </section>
  );
};
