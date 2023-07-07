import { useContext, useEffect, useState } from "react";
import defaultAvatar from "../../avatar/avatar.jpg";
import { AuthContext } from "../../context/AuthContext";
import { settingsService } from "../services";
import "./styles/ProfilePage.css";

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

      const avatarData = await settingsService({ data, token });

      updateUser({ ...user, avatar: avatarData.avatar });
    } catch (error) {
      setError(error.message);
      //mostrar error en pantalla
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

      await settingsService({ data, token });
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
      <h1>Profile</h1>

      {user?.username ? <h2>{user.username}</h2> : null}

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
          {/* <input type="text" id="newBio" name="newBio" /> */}

          <button type="submit" disabled={sending}>
            {sending ? "Enviando..." : "Subir bio"}
          </button>
          {error ? <p>{error}</p> : null}
        </form>
      ) : user?.bio ? (
        <p className="editBio" onClick={handleBioClick}>
          {user.bio}
        </p>
      ) : (
        <p className="editBio" onClick={handleBioClick}>
          Escribe aqui tu bio
        </p>
      )}

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

      <hr />

      <p className="notice">Cambiar esto por formularios estándar</p>
    </section>
  );
};
