import React, {useEffect} from "react";
import styles from "./Home.module.css";

export default function Home() {

  useEffect(()=>{ //creo carrito vacío en localStorage, si aun no existe
    const carrito = window.localStorage.getItem('carrito')
    if (!carrito){
      window.localStorage.setItem('carrito', JSON.stringify([]))
    }
  },[])
  
  return (
    //contiene ademas del titulo imagenes que se mostraran automaticamente y las redes sociales para ir
    <div className={styles.container}>
      <div className={styles.huella}/>
      <h1 className={styles.title}>SALVANDO HUELLAS!</h1>
      <div className={styles.body}>
        <div className={styles.kodfunGaleri}>
          <div style={{ backgroundImage: "url('img/home-dogs1.png')" }}></div>
          <div style={{ backgroundImage: "url('/img/home-dogs2.png')" }}></div>
          <div style={{ backgroundImage: "url('/img/home-dogs3.png')" }}></div>
          <div style={{ backgroundImage: "url('/img/home-dogs4.png')" }}></div>
          <div style={{ backgroundImage: "url('/img/home-dogs5.png')" }}></div>
          <div style={{ backgroundImage: "url('/img/home-dogs6.png')" }}></div>
        </div>
      </div>
      <div className={styles.iconsContainer}>
        <div>
          <h5 className={styles.follow}>
            Seguinos en nuestras redes sociales:
          </h5>
          </div>
          <div className={styles.iconsContainer}>
            <div>
              <h5 className={styles.follow}>
                Seguinos en nuestras redes sociales:
              </h5>
              <div className={styles.icons}>
                {" "}
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
        
      </div>
    
  );
}