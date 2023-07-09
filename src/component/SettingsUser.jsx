import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { settingsService } from "../services";

export const SettingsUser = () => {
  const { user, token, updateUser } = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email || "");
  const [oldPass, setOldPass] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [username, setUsername] = useState(user?.username || "");
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();

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
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="settings">
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="newUsername">Nombre de usuario</label>
          <input
            value={username}
            type="text"
            id="newUsername"
            name="newUsername"
            onChange={(e) => setUsername(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="newEmail">Email</label>
          <input
            value={email}
            type="email"
            id="newEmail"
            name="newEmail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            onChange={(e) => setOldPass(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="newPassword">Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            onChange={(e) => setPass1(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            onChange={(e) => setPass2(e.target.value)}
          />
        </fieldset>
        {error ? <p>{error}</p> : null}
        <button type="submit" disabled={sending}>
          {sending ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </section>
  );
};
