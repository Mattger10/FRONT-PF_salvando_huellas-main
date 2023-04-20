import "./NavBar.modules.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// La NavBar se puede convertir en un menú desplegable desde el costado, por ahora está fija arriba

export default function NavBar() {
  const navigate = useNavigate();
  const access = useSelector((state) => state.access);
  const location = useLocation()

  return (
    <div className="nav">
      <Link to="/home">
        <img className="img" src="/img/logo.jpeg" />
      </Link>
      <Link to="/about">
        <button className={location.pathname === '/about' ? 'selectedButton' : 'normalButton'}>Conócenos</button>
      </Link>
      <Link to="/shop">
        <button className={location.pathname === '/shop' ? 'selectedButton' : 'normalButton'}>PetShop</button>
      </Link>

      {/* <button
        onClick={() => {
          if (access) {
            navigate("/adopt");
          } else {
            navigate("/");
          }
        }}
      > */}

      <button className={location.pathname === '/adopt' ? 'selectedButton' : 'normalButton'}
        onClick={() => {
          navigate("/adopt");
        }
        
      }
      >
        Adopta Ahora!
      </button>

      <Link to="/dogs">
        <button className={location.pathname === '/dogs' ? 'selectedButton' : 'normalButton'}>Perros</button>
      </Link>
      <Link to="/donar">
        <button className={location.pathname === '/donar' ? 'selectedButton' : 'normalButton'}>Donaciones</button>
      </Link>
      <Link to="/carrito">
        <img src="/img/carrito.png" id="carrLogo" />
      </Link>
      <Link to="/account">
        <img src="/img/perfil.png" id="carrLogo" />
      </Link>
    </div>
  );
}
