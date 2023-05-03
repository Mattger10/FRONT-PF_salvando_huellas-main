import React from "react";
import styles from "./CardUser.module.css";

export default function CardUser({
  id,
  name,
  lastName,
  email,
  phone,
  address,
  isBan,
  isAdmin,
  reason,
  banUser,
  unbanUser,
}) {
  return (
    // <div className={styles.userContainer}>
    //   <h4>{name + " " + lastName}</h4>
    //   <div className={styles.info} >
    //   <span>{email}</span>
    //   <span>{phone}</span>
    //   <span>{address}</span>
    //   <span>{reason ? reason : ""}</span>
    //   <span className={styles.banned}>{isBan ? "BANNED" : ""}</span>
    //   <span>{isAdmin ? "ADMIN" : ""}</span>
    //   </div>
    //   <div className={styles.userButtons}>
    //     <button
    //       className={`${styles.userBan} ${isBan ? styles.green : styles.red}`}
    //       onClick={() => {
    //         isBan ? unbanUser(id) : banUser(id);
    //       }}
    //     >
    //       {isBan ? "DESBANEAR USUARIO" : "BANEAR USUARIO"}
    //     </button>

    //   </div>
    // </div>


    <div className={styles.packContainer}>
  <div className={styles.header}>
    <p className={styles.title}>
      Starter
    </p>
    <div className={styles.priceContainer}>
      <span>$</span>24
      <span>/mo</span>
    </div>
  </div>
  <div>
    <ul className={styles.lists}>
      <li className={styles.list}>
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p>
          2 team members
        </p>
      </li>
      <li className={styles.list}>
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p  className={styles.p}>
          100+ components
        </p>
      </li>
      <li className={styles.list}>
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p  className={styles.p}>
          2 month free updates
        </p>
      </li>
      <li className={styles.list}>
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p className={styles.p}>
          Life time technical support
        </p>
      </li>
    </ul>
  </div>
  <div className={styles.buttonContainer}>
    <button type="button">
      Buy Now
    </button>
  </div>
</div>




  );
}
