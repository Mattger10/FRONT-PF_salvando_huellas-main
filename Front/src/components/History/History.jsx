import React from "react";
import styles from "./History.module.css";

export default function History() {

    return (
        <div className={styles.fondo}>
        <div className={styles.container}>
            <h1 className={styles.title} >¡SALVANDO HUELLAS!</h1>
            <div className={styles.containerText} >
                <h5 className={styles.text} >
                Hace más de 20 años nos encontramos un grupo de personas en nuestra ciudad y alrededores,
                trabajando cada uno por su lado en la misma causa, tratar de aliviar y ayudar a los animales necesitados en situación de calle y de barrios carenciados,
                con necesidades cada vez mayores, entonces nos reunimos y decidimos aunar fuerzas y recursos, trabajar juntos para llegar más lejos, ayudar más,
                tratar de concientizar a toda la comunidad y luchar para lograr la participación y compromiso estatal también.
            </h5>
            </div>
            <div className={styles.containerImg} >
            <img className={styles.img} src="/img/history.png" alt="Image 1" />
            </div>
        </div>
        </div>
    )
} 