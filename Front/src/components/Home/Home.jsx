import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuth0();

  useEffect(() => {
    const userLocal = JSON.parse(window.localStorage.getItem("user"));
    if (!userLocal || !userLocal.nameU) {
      if (isAuthenticated && !isLoading) {
        console.log("USER TERCEROS ",user)
        let exist = false;
        axios
          .get("/users")
          .then((res) => res.data)
          .then((users) => {
            users.forEach((userL) => {
              if (userL.emailU === user.email) {
                exist = true;
                window.localStorage.setItem(
                  "user",
                  JSON.stringify({ ...userL })
                );
              }
            });
          })
          .catch((error) => console.log(error.message));
        if (!exist) {
          axios
            .post("/users/register", {
              nameU: user.name.split(" ")[0],
              lastNameU: user.name.split(" ")[1] || " ",
              passwordU: "huellas",
              idNumbU: Math.round(Math.random() * 100000000), // DNI del usuario, por ahora random
              emailU: user.email,
              phoneU: "Sin teléfono",
              addressU: "Sin direccion",
              reasonU: "Reason",
            })
            .then((res) => res.data)
            .then((newUser) =>
              window.localStorage.setItem("user", JSON.stringify(newUser))
            )
            .catch((error) => console.log(error.message));
        }
      }
    }
  }, [isLoading]);

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
      <h1 style={{ fontFamily: "Cat Paw" }} className={styles.title}>
        SALVANDO HUELLAS!
      </h1>
      <div className={styles.body}>
        <div className={styles.kodfunGaleri}>
          <div
            style={{
              backgroundImage:
                "url('https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2Fcomo-son-los-perros-mestizos.png?alt=media&token=76383096-01f8-422f-9212-82393a524411')",
            }}
          ></div>
          <div
            style={{
              backgroundImage:
                "url('https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2FPerrito.jpg?alt=media&token=e3b2707a-e5e2-4068-9e8e-1bf562b7fddf')",
            }}
          ></div>
          <div
            style={{
              backgroundImage:
                "url('https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2Fperro15.jpg?alt=media&token=17bd1d28-ceb2-45af-ab0f-973aad3325b9')",
            }}
          ></div>
          <div
            style={{
              backgroundImage:
                "url('https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2Fperros-jugando.jpeg?alt=media&token=a881d562-1861-4d09-bac9-95dcf1441ef2')",
            }}
          ></div>
          <div
            style={{
              backgroundImage:
                "url('https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2Fperro14.jpeg?alt=media&token=52b92ebf-87ff-43c9-ae22-c9f14f3e2f56')",
            }}
          ></div>
          <div
            style={{
              backgroundImage:
                "url('https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/salvandohuellas%2Fdepositphotos_543005528-stock-photo-labrador-retriever-dog-lying-on.jpg?alt=media&token=7afd997f-419f-45ce-beb2-4a46c076c869')",
            }}
          ></div>
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
              <a href="mailto:salvandohuellasjesusmaria@gmail.com">
                <img
                  loading="lazy"
                  alt="contacto por correo"
                  height="35"
                  width="35"
                  src="https://cdn.icon-icons.com/icons2/1826/PNG/512/4202011emailgmaillogomailsocialsocialmedia-115677_115624.png"
                  title="contacto por correo"
                />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=5493525418986"
                target="_blank"
                className={styles.whatsapp}
              >
                <img
                  loading="lazy"
                  alt="Contacto por WhatsApp"
                  height="35"
                  width="35"
                  src="https://cdn.icon-icons.com/icons2/41/PNG/96/whatsappmessage_conversation_whatsap_7149.png"
                  title="Contacto por WhatsApp"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
