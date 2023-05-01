import React from "react";
import styles from "../CardDogs/CardDogs.module.css";
import { useLocation } from "react-router-dom";
import translateData from "../../utils/translateData";
//Acá traigo a todas las cards de los perros -iri-

export default function CardDogs({
  photoD,
  nameD,
  ageD,
  sexD,
  sizeD,
  handleEdit,
  handleDelete,
  id,
}) {
  //Funciones handle vienen de AdminDogs

  // --------------------------valentin-------------------------
  const location = useLocation(); // RENDERIZO DISTINTA LA CARD SI ESTAMOS EN ADMIN -- Valentin


  const handleDel = () => {
    let response = confirm("¿Está seguro que desea eliminar el perrito?");
    if (response === true) {
        handleDelete(id)
    }
  };

  if (location.pathname === "/admin/dogs") {
    return (
      <div className={styles.containerAll}>
        <div className={styles.containerAdmin}>
          <div className={styles.cardAdmin}>
            <img className={styles.cardImgAdmin} src={photoD} alt="img" />
            <p className={styles.textTitleAdmin}>{nameD}</p>
            <div className={styles.cardInfoAdmin}>
              <div className={styles.textBodyAdmin}>
                <h4>Edad:</h4>
                <p>{translateData(ageD)}</p>
                <h4>Tamaño:</h4>
                <p>{translateData(sizeD)}</p>
                <h4>Sex:</h4>
                <p>{translateData(sexD)}</p>
              </div>
              <div>
                <button
                  className={styles.button}
                  onClick={() => {
                    handleEdit(id);
                  }}
                >
                  EDITAR
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    handleDel()
                  }}
                >
                  ELIMINAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      //   <>
      //     <div>
      //       <div>
      //         <h3>{nameD}</h3>
      //       </div>
      //       <div>
      //         <img src={photoD} alt="img" />
      //       </div>
      //       <div>
      //         <div>
      //           <h4>Edad:</h4>
      //           <p>{ageD}</p>
      //         </div>
      //         <div>
      //           <h4>Tamaño:</h4>
      //           <p>{sizeD}</p>
      //         </div>
      //         <div>
      //           <h4>Sex:</h4>
      //           <p>{sexD}</p>
      //         </div>
      //         <div>
      //           <button
      //             onClick={() => {
      //               handleEdit(id);
      //             }}
      //           >
      //             EDITAR
      //           </button>
      //           <button
      //             onClick={() => {
      //               handleDelete(id);
      //             }}
      //           >
      //             ELIMINAR
      //           </button>
      //         </div>
      //       </div>
      //     </div>
      //   </>
    );
  }

  return (
    //   <>
    //   <div className={styles.container}>
    //         <h3 className={styles.h3}>{nameD}</h3>
    //         <img className={styles.img} src={photoD} alt="img" />
    //         <h4>Edad:</h4>
    //         <p>{ageD}</p>
    //         <h4>Tamaño:</h4>
    //         <p>{sizeD}</p>
    //         <h4>Sexo:</h4>
    //         <p>{sexD}</p>
    //   </div>
    // </>

    // <div className={styles.cardContainer}>
    //   <div className={styles.huella} />
    //   <div className={styles.card}>
    //     <div className={styles.card__inner}>
    //       <div
    //         className={`${styles.card__body} ${styles["card__body--front"]}`}
    //       >
    //         <img className={styles.card__img} src={photoD} alt="img" />
    //       </div>
    //       <div className={`${styles.card__body} ${styles["card__body--back"]}`}>
    //         <h3 className={styles.h3}>{nameD}</h3>
    //         <div className={styles.card__title2}>
    //           <h4>Edad:</h4>
    //           <p>{ageD}</p>
    //           <h4>Tamaño:</h4>
    //           <p>{sizeD}</p>
    //           <h4>Sexo:</h4>
    //           <p>{sexD}</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className={styles.cardContainer}>
      <div className={styles.huella} />
      <div className={styles.card}>
        <img className={styles.img} src={photoD} alt="img" />
        <div className={styles.card2}>
            <h2 style={{ fontFamily: 'Sunny Sunday' }} className={styles.h2}>{nameD}</h2>
          <div className={styles.containerData}>
            <h4 className={styles.h4}>Edad:</h4>
            <p className={styles.p}>{translateData(ageD)}</p>
            <h4 className={styles.h4}>Tamaño:</h4>
            <p className={styles.p}>{translateData(sizeD)}</p>
            <h4 className={styles.h4} >Sexo:</h4>
            <p className={styles.p}>{translateData(sexD)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
