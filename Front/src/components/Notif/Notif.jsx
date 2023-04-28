import React, { useState, useEffect } from "react";
import styles from "./Notif.module.css";
import Account from "../Account/Account";

const Notif = (props) => {
  const [notif, setNotif] = useState({ message: "", show: false });


  return (
    <div className={styles.notification} style={{ display: props.message ? "block" : "none" }}>
      {props.message}
     
    </div>
  );
};

export default Notif;