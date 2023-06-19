import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { sendPostService } from "../services";
import { AuthContext } from "../../context/AuthContext";

export const NewPost = ({ addPost }) => {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const { token } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);

      const data = new FormData();

      data.append("postImage", e.target.postImage.files[0]);
      data.append("postText", e.target.postText.value);

      const post = await sendPostService({ data, token });
      addPost(post);
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleForm}>
      <h1>Añade un nuevo Post</h1>

      <fieldset>
        <label htmlFor="postImage">Sube tu post</label>
        <input
          type="file"
          id="postImage"
          name="postImage"
          accept="image/*"
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="postText">Escribe en el pie de la foto</label>
        <input type="text" id="postText" name="postText" />
      </fieldset>
      <button type="submit" disabled={sending}>
        {sending ? "Enviando..." : "Subir Post"}
      </button>
      {error ? <p>{error}</p> : null}
    </form>
  );
};

NewPost.propTypes = {
  addPost: PropTypes.func.isRequired,
};
