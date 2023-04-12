import React from "react";

//Acá traigo a todas las cards de los perros -iri-
export default function CardDogs({ image, name, age, race, sex }) {
  return (
    <>
      <div>
        <h3>{name}</h3>
      </div>
      <div>
    <img src={image} alt="img" />
      </div>
      <div>
        <p>{age}</p>
        <p>{race}</p>
        <p>{sex}</p>
      </div>
    </>
  );
}
