import React from "react";
import style from "./Button.module.scss";

export default function Button1() {
  return (
    <>
      <ul className={style.try_ul}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
      <button className={`${style.btn}`}>Button1</button>
      <div class="wrapper">
        <div class="emoji" tabindex="0">
          🐶
        </div>
        <div class="emoji" tabindex="0">
          🐱
        </div>
        <div class="emoji" tabindex="0">
          🐢
        </div>
      </div>
    </>
  );
}
