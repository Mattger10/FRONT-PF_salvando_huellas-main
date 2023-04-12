import "./NavBar.modules.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// La NavBar se puede convertir en un menú desplegable desde el costado, por ahora está fija arriba

export default function NavBar() {
  const navigate = useNavigate();
  const access = useSelector((state) => state.access);

  return (
    <div className="nav">
      <Link to="/home">
        <img src="/img/logo.jpeg" />
      </Link>
      <Link to="/about">
        <button>Conócenos</button>
      </Link>
      <Link to="/shop">
        <button>PetShop</button>
      </Link>

      <button
        onClick={() => {
          if (access) {
            navigate("/adopt");
          } else {
            navigate("/");
          }
        }}
      >
        Adopta Ahora!
      </button>

      <Link to="/dogs">
        <button>Perros</button>
      </Link>
      <Link to="/donar">
        <button>Donaciones</button>
      </Link>
      <Link to="/carrito">
        <button>Carrito</button>
      </Link>
      <Link to="/account">
        <button>Mi Cuenta</button>
      </Link>
    </div>
  );
}
