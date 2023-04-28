import React, { useEffect } from "react";
import styles from "./Home.module.css";

export default function Home() {
  useEffect(() => {
    //creo carrito vacío en localStorage, si aun no existe
    const carrito = window.localStorage.getItem("carrito");
    if (!carrito) {
      window.localStorage.setItem("carrito", JSON.stringify([]));
    }
  }, []);

  return (
    //contiene ademas del titulo imagenes que se mostraran automaticamente y las redes sociales para ir
    <div className={styles.container}>
      <div className={styles.huella} />
      <h1 style={{ fontFamily: 'Cat Paw' }} className={styles.title}>SALVANDO HUELLAS!</h1>
      <div className={styles.body}>
        <div className={styles.kodfunGaleri}>
          <div
            style={{
              backgroundImage:
                "url('https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2Fcomo-son-los-perros-mestizos.png?alt=media&token=76383096-01f8-422f-9212-82393a524411')",
            }}
          ></div>
          <div style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2FPerrito.jpg?alt=media&token=e3b2707a-e5e2-4068-9e8e-1bf562b7fddf')" }}></div>
          <div style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2Fperro15.jpg?alt=media&token=17bd1d28-ceb2-45af-ab0f-973aad3325b9')" }}></div>
          <div style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2Fperros-jugando.jpeg?alt=media&token=a881d562-1861-4d09-bac9-95dcf1441ef2')" }}></div>
          <div style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2Fperro14.jpeg?alt=media&token=52b92ebf-87ff-43c9-ae22-c9f14f3e2f56')" }}></div>
          <div style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2Fdepositphotos_543005528-stock-photo-labrador-retriever-dog-lying-on.jpg?alt=media&token=7afd997f-419f-45ce-beb2-4a46c076c869')" }}></div>
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
