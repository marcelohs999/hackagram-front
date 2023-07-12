import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { settingsService } from "../services";
// Gestionamos cambios de perfil con toast, en vez de un alert cutre
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/SettingsUser.css";

export const SettingsUser = () => {
  const { user, token, updateUser } = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email || "");
  const [oldPass, setOldPass] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [username, setUsername] = useState(user?.username || "");
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const [changesMade, setChangesMade] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setChangesMade(e.target.value !== user?.username);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setChangesMade(e.target.value !== user?.email);
  };

  const handleOldPassChange = (e) => {
    setOldPass(e.target.value);
    setChangesMade(e.target.value !== "");
  };

  const handlePass1Change = (e) => {
    setPass1(e.target.value);
    setChangesMade(e.target.value !== "");
  };

  const handlePass2Change = (e) => {
    setPass2(e.target.value);
    setChangesMade(e.target.value !== "");
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (!changesMade) {
      return;
    }

    try {
      setSending(true);

      const data = {};

      if (username) {
        data.newUsername = username;
      }

      if (email) {
        data.newEmail = email;
      }

      if (oldPass) {
        data.oldPassword = oldPass;
        data.newPassword = pass1;
        data.repeatPassword = pass2;
      }

      await settingsService({ data, token });
      updateUser({ ...user, username });

      toast.success("¡Cambios guardados correctamente!", {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      if (
        email !== (user?.email || "") ||
        oldPass !== "" ||
        pass1 !== "" ||
        pass2 !== "" ||
        username !== (user?.username || "")
      ) {
        setChangesMade(true);
      } else {
        setChangesMade(false);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
      setChangesMade(false);
    }
  };

  return (
    <section className="settings">
      <form onSubmit={handleForm}>
        <fieldset>
          <div className="field">
            <label htmlFor="newUsername">Nombre de usuario</label>
            <input
              value={username}
              type="text"
              id="newUsername"
              name="newUsername"
              onChange={(e) => {
                handleUsernameChange(e);
                handleInputChange(e, setUsername);
              }}
            />
          </div>

          <div className="field">
            <label htmlFor="newEmail">E-mail</label>
            <input
              value={email}
              type="email"
              id="newEmail"
              name="newEmail"
              onChange={(e) => {
                handleEmailChange(e);
                handleInputChange(e, setEmail);
              }}
            />
          </div>

          <div className="field">
            <label htmlFor="oldPassword">Antigua contraseña</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              onChange={(e) => {
                handleOldPassChange(e);
                handleInputChange(e, setOldPass);
              }}
            />
          </div>

          <div className="field">
            <label htmlFor="newPassword">Nueva contraseña</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              onChange={(e) => {
                handlePass1Change(e);
                handleInputChange(e, setPass1);
              }}
            />
          </div>

          <div className="field">
            <label htmlFor="repeatPassword">Repite contraseña</label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              onChange={(e) => {
                handlePass2Change(e);
                handleInputChange(e, setPass2);
              }}
            />
          </div>
        </fieldset>
        {error ? <p>{error}</p> : null}
        <button type="submit" disabled={!changesMade || sending}>
          {sending ? "Enviando..." : "Enviar"}
        </button>
      </form>

      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  );
};
