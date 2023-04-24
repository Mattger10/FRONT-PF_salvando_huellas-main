import React, { useState, useEffect } from "react";
import styles from "./Form.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FormularioAdopcion() {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tieneNiños, setTieneNiños] = useState();
  const [razonAdopcion, setRazonAdopcion] = useState(""); 
  const [selectDog, setSelectDog] = useState(""); 
  const [isLogged, setIsLogged] = useState(true);
  const [allDogs, setAllDogs] = useState([])

  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Acá se agrega la lógica para enviar los datos del formulario al servidor
    console.log({
      email,
      nombre,
      apellido,
      dni,
      domicilio,
      telefono,
      tieneNiños,
      razonAdopcion,
    });

    // Acá se reinician los valores de los campos del formulario
    setEmail("");
    setNombre("");
    setApellido("");
    setDni("");
    setDomicilio("");
    setTelefono("");
    setTieneNiños();
    setRazonAdopcion("");
    setSelectDog("")
  };

  const handleTieneNiñosChange = (e) => {
    setTieneNiños(e.target.value === "si");
  };

  useEffect(() => {
    const userLocal = JSON.parse(window.localStorage.getItem("user"));
    if (!userLocal.nameU && !isAuthenticated) {
      setIsLogged(false);
    }
  }, []);

  useEffect(()=>{
    axios.get('/dogs').then(res => res.data).then(dogs => {
      const all = dogs.map((d, index) => <option key={index}>{d.nameD}</option>)
      setAllDogs(all)
    }).catch(err => console.log(err.message))
  }, [])
  return (
    <div className={styles.container}>
      {isLogged && (
        <form className={styles.formulario} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              placeholder="Ingresar nombre"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              placeholder="Ingresar apellido"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Ingresar dirección de email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="dni">DNI:</label>
            <input
              type="text"
              placeholder="Ingrese su número de DNI"
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="domicilio">Domicilio:</label>
            <input
              type="text"
              placeholder="Ingrese su domicilio"
              id="domicilio"
              value={domicilio}
              onChange={(e) => setDomicilio(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
              pattern="^[0-9]{3}-?[0-9]{7}$"
              placeholder="Ej: 11-1234567"
            />
          </div>

          <div className={styles.check}>
            <label className={styles.check1}>
              ¿Tienes niños en casa?
              <input
                type="checkbox"
                name="tieneNiños"
                value="si"
                checked={!!tieneNiños}
                onChange={handleTieneNiñosChange}
              />
              Sí
            </label>
            <label>
              <input
                type="checkbox"
                name="tieneNiños"
                value="no"
                checked={tieneNiños === false}
                onChange={handleTieneNiñosChange}
              />
              No
            </label>
          </div>

          <div>
            <label htmlFor="razonAdopcion">Razón de adopción:</label>
            <textarea
              id="razonAdopcion"
              value={razonAdopcion}
              onChange={(e) => setRazonAdopcion(e.target.value)}
              required
            />
          </div>
          <label htmlFor="dogs">¿A quién deseas adoptar?</label>
            <select
              type="tel"
              id="dogs"
              value={selectDog}
              onChange={(e) => setSelectDog(e.target.value)}
              required
            >
              {allDogs}
            </select>
          <button type="submit" className={styles.button}>
            Adoptar
          </button>
          <button type="submit" className={styles.button}>
            Hogar provisorio
          </button>
        </form>
      )}
      {/* CONSULTA SI ESTA LOGEADO SINO VUELVE AL LANDING */}
      {!isLogged && (
        <div className="">
          <h2>Oops!</h2>
          <h3>Necesitas iniciar sesión para solicitar una adopción</h3>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Iniciar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default FormularioAdopcion;
