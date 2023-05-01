import React, { useState, useEffect } from "react";
import styles from "./Form.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notif from "../Notif/Notif";

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
  const [allDogs, setAllDogs] = useState([]);
  const [message, setMessage] = useState("");
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  let [formState, setFormState] = useState(1);
  
  
  
  const handleTieneNiñosChange = (e) => {
    setTieneNiños(e.target.value === "si");
  };

  useEffect(() => {
    const userLocal = JSON.parse(window.localStorage.getItem("user"));
    if (!userLocal?.nameU && !isAuthenticated) {
      setIsLogged(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    axios
      .get("/dogs")
      .then((res) => {
        const dogs = res.data;
        const all = dogs.map((d, index) => (
          <option key={index} value={d.nameD}>
            {d.nameD}
          </option>
        ));
        setAllDogs(all);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectDog.length) {
        return;
      }
      const userId = JSON.parse(window.localStorage.getItem("user")).id_User;
      const dogId = await axios
        .get("/dogs")
        .then((res) => res.data)
        .then((dogs) => dogs.filter((dog) => dog.nameD === selectDog)[0])
        .then((dog) => dog.id_Dog);
      if (formState === 1) {
        await axios.post("/adoptions/register", {
          adopted_homeA: "adopt",
          id_Dog: dogId,
          id_User: userId,
        });
        await axios.put("/users/" + userId, {
          nameU: nombre,
          lastNameU: apellido,
          phoneU: telefono,
          addressU: domicilio,
          reasonU: razonAdopcion,
          idNumbU: Number(dni),
          emailU: email
        });
        setMessage("Solicitud de adopción enviada");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      }
      if (formState === 2) {
        await axios.post("/adoptions/register", {
          adopted_homeA: "home",
          id_Dog: dogId,
          id_User: userId,
        });
        await axios.put("/users/" + userId, {
          nameU: nombre,
          lastNameU: apellido,
          phoneU: telefono,
          addressU: domicilio,
          reasonU: razonAdopcion,
          idNumbU: Number(dni),
          emailU: email
        });
        setMessage("Solicitud de hogar provisorio enviada");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      console.log(error.message);
    }

    // Acá se reinician los valores de los campos del formulario
    setEmail("");
    setNombre("");
    setApellido("");
    setDni("");
    setDomicilio("");
    setTelefono("");
    setTieneNiños();
    setRazonAdopcion("");
    setSelectDog("");
  };


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

            <option hidden value="">
              Elegir
            </option>
            {allDogs}
          </select>
          <button
            type="submit"
            className={styles.button}
            onClick={() => {
              setFormState(1);
            }}
          >
            Adoptar
          </button>
          <button
            type="submit"
            className={styles.button}
            onClick={() => {
              setFormState(2);
            }}
          >
            Hogar provisorio
          </button>
        </form>
      )}
      {/* CONSULTA SI ESTA LOGEADO SINO VUELVE AL LANDING */}
      {!isLogged && (
        <div className={styles.containerObligatorio}>
          <h2 className={styles.titleObligatorio}>Oops!</h2>
          <h3 className={styles.subtitleObligatorio}>
            Necesitas iniciar sesión para solicitar una adopción
          </h3>
          <button
            className={styles.buttonObligatorio}
            onClick={() => {
              navigate("/");
            }}
          >
            Iniciar Sesión
          </button>
        </div>
      )}
      <Notif message={message} />
    </div>

  );
}

export default FormularioAdopcion;
