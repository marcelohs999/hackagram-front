import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import notFoundGif from "../../logos/notfound.gif";
import notFoundBot from "../../logos/notfoundbot.png";
import "./styles/NotFound.css";

export const NotFound = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth > 767
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth > 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section>
      <div className="notfound-img-container">
        <img
          src={isSidebarVisible ? notFoundBot : notFoundGif}
          alt="Ruta no encontrada"
        />
      </div>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
};
