import React from "react";
import { Link } from 'react-router-dom';



export default function LandingPage() {


  
  

  return (
    <div>
      <img src="" alt="" />
      <h1>SALVANDO HUELLAS!</h1>
      <br />
      <button>Ingresar</button>
      <br />
      <button>Registrarse</button>
      <br />
      <Link to="/home">
      <button>Ingresar como invitado</button>
      </Link>
      <br />
      <input type="text" placeholder="Email" />
      <br />
      <input type="password" placeholder="Contraseña" />
    </div>
  );

};
