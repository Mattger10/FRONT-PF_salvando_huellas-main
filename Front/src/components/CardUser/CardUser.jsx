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
    <div className={styles.userContainer}>
      <h4>{name + " " + lastName}</h4>
      <span>{email}</span>
      <span>{phone}</span>
      <span>{address}</span>
      <span>{reason ? reason : ""}</span>
      <span className={styles.banned}>{isBan ? "BANNED" : ""}</span>
      <span>{isAdmin ? "ADMIN" : ""}</span>
      <div className={styles.userButtons}>
        <button
          className={`${styles.userBan} ${isBan ? styles.green : styles.red}`}
          onClick={() => {
            isBan ? unbanUser(id) : banUser(id);
          }}
        >
          {isBan ? "DESBANEAR USUARIO" : "BANEAR USUARIO"}
        </button>

      </div>
    </div>
  );
}
