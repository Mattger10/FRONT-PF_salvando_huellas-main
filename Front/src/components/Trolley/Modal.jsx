import React from "react";
import style from "./Modal.module.css";

export default function Modal(props) {
  return (
    <div className={style.modal}>
      <div className={style.content}>{props.children}</div>
    </div>
  );
}
