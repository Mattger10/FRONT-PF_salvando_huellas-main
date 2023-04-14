import React, { useState } from "react";
import styles from "./Form.module.css";

function FormularioAdopcion() {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tieneNiños, setTieneNiños] = useState ("");
  const [razonAdopcion, setRazonAdopcion] = useState("");

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
    setTieneNiños(false);
    setRazonAdopcion("");
  };

  const handleTieneNiñosChange = (e) => {
    setTieneNiños(e.target.value === "si");
  };

  return (
    <div className={styles.container}>
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
          id="domicilio"
          value={domicilio}
          onChange={(e) => setDomicilio(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label>
          ¿Tienes niños en casa?
          <input
            type="checkbox"
            name="tieneNiños"
            value="si"
            checked={tieneNiños}
            onChange={handleTieneNiñosChange}
          />
          Sí
        </label>
        <label>
          <input
            type="checkbox"
            name="tieneNiños"
            value="no"
            checked={!tieneNiños}
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
      <button type="submit" className={styles.button}>Adoptar</button>
      <button type="submit" className={styles.button}>Hogar provisorio</button>
    </form>
    </div>
  );
}

export default FormularioAdopcion;
