import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {

  return (
    //contiene ademas del titulo imagenes que se mostraran automaticamente y las redes sociales para ir
    <div className={styles.container}>
      <h1 className={styles.title}>SALVANDO HUELLAS!</h1>

    <div className={styles.body}>
      <div className={styles.kodfunGaleri}>
        <div style={{backgroundImage: "url('img/home-dogs1.png')"}}></div>
        <div style={{backgroundImage: "url('/img/home-dogs2.png')"}}></div>
        <div style={{backgroundImage: "url('/img/home-dogs3.png')"}}></div>
        <div style={{backgroundImage: "url('/img/home-dogs4.png')"}}></div>
        <div style={{backgroundImage: "url('/img/home-dogs5.png')"}}></div>
        <div style={{backgroundImage: "url('/img/home-dogs6.png')"}}></div>
      </div>
      </div>

      {/* <div>
        <div>
          <div className={styles.galeri}>
            <img className={styles.img} src="/img/home-dogs1.png" alt="Image 1" />
            <img className={styles.img} src="/img/home-dogs2.png" alt="Image 2" />
            <img className={styles.img} src="/img/home-dogs3.png" alt="Image 3" />
            <img className={styles.img} src="/img/home-dogs4.png" alt="Image 4" />
          </div>
        </div>
      </div>
      <div className={style.iconsContainer}>
        <div>
          <h5 className={styles.follow}>Seguinos en nuestras redes sociales:</h5>

          <div className={styles.icons}>
            {" "}
            {/*aqui pego los links de las redes sociales o contactos */}
            <a
              href="https://www.facebook.com/profile.php?id=100079609239145"
              target="_blank"
            >
              <img
                loading="lazy"
                alt="Síganos en Facebook"
                height="35"
                width="35"
                src=" https://1.bp.blogspot.com/-Pop-U7OywXs/YPhkfrImyiI/AAAAAAAAA1Y/UBnVfTK9j2U-bIUqwZYMNSQPvz_l06mbwCPcBGAYYCw/s0/facebook-icono.png"
                title="Síganos en Facebook"
              />
            </a>
            <a
              href="https://www.instagram.com/salvandohuellas9/"
              target="_blank"
            >
              <img
                loading="lazy"
                alt="Síganos en Instagram"
                height="35"
                width="35"
                src="https://1.bp.blogspot.com/-VFfOISywV0c/YPhkeRXuRQI/AAAAAAAAA1M/L75S9Usg5AovunH2Y-VzqJbaaY1LuK3eACPcBGAYYCw/s0/Instagram-icono.png"
                title="Síganos en Instagram"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
