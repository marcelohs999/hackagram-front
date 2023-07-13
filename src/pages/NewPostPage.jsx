import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import usePosts from "../hooks/usePosts";
import { sendPostService } from "../services";
import { useNavigate } from "react-router-dom";
import "./styles/NewPostPage.css";

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
    <form onSubmit={handleForm} className="new-form">
      <h2>Añade una foto</h2>

      <fieldset>
        <label htmlFor="postImage"></label>
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
        <label htmlFor="postText"></label>
        <textarea
          type="text"
          id="postText"
          name="postText"
          placeholder="Escribe en el pie de la foto"
        />
      </fieldset>
      <button type="submit" disabled={sending}>
        {sending ? "Enviando..." : "Subir Post"}
      </button>
      {error ? <p>{error}</p> : null}
    </form>
  );
};
