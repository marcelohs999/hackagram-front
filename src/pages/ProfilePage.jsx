import { useContext, useEffect, useState } from "react";
import defaultAvatar from "../../avatar/avatar.jpg";
import { AuthContext } from "../../context/AuthContext";
import { newAvatarService } from "../services";

export const ProfilePage = () => {
  const [upload, setUpload] = useState(null);
  const [error, setError] = useState(null);
  const { user, token, updateUser } = useContext(AuthContext);
  const backendURL = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    const uploadFile = async () => {
      setError(null);
      try {
        const data = new FormData();
        data.append("newAvatar", upload);

        const avatarData = await newAvatarService({ data, token });
        setUpload(avatarData.avatar);
        updateUser({ ...user, avatar: avatarData.avatar });
      } catch (error) {
        setError(error.message);
        //mostrar error en pantalla
        setUpload(null);
      }
    };

    if (upload) uploadFile();
  }, [upload]);

  const userAvatar = user?.avatar
    ? `${backendURL}/uploads/avatars/${user?.avatar}`
    : defaultAvatar;

  return (
    <section className="profile">
      <h1>Profile</h1>

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
          onChange={(e) => setUpload(e.target.files[0])}
        />
      </section>

      <hr />

      {user?.username ? <h2>{user.username}</h2> : null}
      {user?.bio ? <p>{user.bio}</p> : null}

      <p className="notice">Cambiar esto por formularios estándar</p>
    </section>
  );
};
