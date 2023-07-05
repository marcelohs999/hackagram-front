import { useEffect, useState } from "react";
import defaultAvatar from "../../avatar/avatar.jpg";

export const ProfilePage = ({ name, avatar, bio }) => {
  const [upload, setUpload] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const uploadFile = async () => {
      setError(null);
      try {
        const data = new FormData();
        data.append("upload", upload);

        //throw new Error("fuck you");
        console.log("subimos formdata");
      } catch (error) {
        setError(error.message);
        //mostrar error en pantalla
        setUpload(null);
      }
    };

    if (upload) uploadFile();
  }, [upload]);

  const userAvatar = upload
    ? URL.createObjectURL(upload)
    : avatar
    ? avatar
    : defaultAvatar;

  return (
    <section className="profile">
      <h1>Profile</h1>

      <section className="avatar">
        <label htmlFor="upload">
          <img src={userAvatar} alt="avatar" />
          <p>Haz click para cambiar el avatar</p>
          {error ? <p>{error}</p> : null}
        </label>

        <input
          type="file"
          accept="image/*"
          id="upload"
          onChange={(e) => setUpload(e.target.files[0])}
        />
      </section>

      <hr />

      {name ? <h2>{name}</h2> : null}
      {bio ? <p>{bio}</p> : null}

      <p className="notice">Cambiar esto por formularios estándar</p>
    </section>
  );
};
