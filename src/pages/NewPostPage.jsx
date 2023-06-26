import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import usePosts from "../hooks/usePosts";
import { sendPostService } from "../services";
import { useNavigate } from "react-router-dom";

export const NewPostPage = () => {
  const { addPost } = usePosts();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);

      const data = new FormData();

      data.append("postImage", e.target.postImage.files[0]);
      data.append("postText", e.target.postText.value);

      const post = await sendPostService({ data, token });
      addPost(post);
      e.target.reset();
      setImage(null);
      navigate("/");
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
          onChange={(e) => setImage(e.target.files[0])}
        />

        {image ? (
          <figure>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ width: "100px" }}
            />
          </figure>
        ) : null}
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
