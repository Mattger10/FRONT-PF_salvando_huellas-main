import React from "react";

//Acá traigo a todas las cards de los perros -iri-
export default function CardDogs({ image, name, age, sex, size, post }) {
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
        <p>{size}</p>
        <p>{sex}</p>
        <p>{post}</p>
      </div>
    </>
  );
}
