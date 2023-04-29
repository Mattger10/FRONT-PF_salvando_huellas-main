import React from "react";
import styles from "./History.module.css";

export default function History() {
  return (
    <div className={styles.fondo}>
        <div className={styles.containerTitle}>
          <h1 style={{ fontFamily: 'Cat Paw' }} className={styles.title } >¡SALVANDO HUELLAS!</h1>
        </div>
      <div className={styles.container}>
        <div className={styles.containerImg}>
          <img className={styles.img} src="/img/history.png" alt="Image 1" />
         
        </div>
        <div className={styles.containerText}>
          <h5 style={{ fontFamily: 'Roboto-Regular' }}className={styles.text}>
          Hace más de 20 años, un grupo de personas en nuestra ciudad y sus alrededores trabajaban individualmente por la misma causa: aliviar y ayudar a los animales necesitados en situación de calle y en barrios carenciados. A medida que las necesidades de los animales crecían, nos dimos cuenta de que debíamos unir fuerzas y recursos para ayudar aún más. Decidimos trabajar juntos para alcanzar una mayor audiencia, sensibilizar a toda la comunidad y presionar para lograr la participación y compromiso estatal.
          </h5>
        </div>
      </div>
      <div className={styles.fotosContainer}>
      <img className={styles.imgN} src="https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2Ffundacion.png?alt=media&token=9d9706e1-7f3d-42ad-b1a9-a9d4034ee738" alt="Image 1" />
      <img className={styles.imgN} src="https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2Fcasitadeperro.png?alt=media&token=910fd3c9-6dd8-435c-9897-08807d4419f8" alt="Image 2" />
      <img className={styles.imgN} src="https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2Ffundacion2.png?alt=media&token=69b6a32c-0990-4a0a-b0e4-4bd210abe66b" alt="Image 3" />
      <img className={styles.imgN} src="https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2Ffundacion3.jpg?alt=media&token=37642eb0-1737-4221-886d-e0cc6017a906" alt="Image 4" />
      <img className={styles.imgN} src="https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2Ffundacion4.jpg?alt=media&token=62a82a31-9db6-425e-af6a-66e25d3fd753" alt="Image 5" />
      </div>
    </div>
  );
}
