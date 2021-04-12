import React from "react";
import styles from "./Featured.module.scss";
import { Grid, GridListTile, GridList } from "@material-ui/core";

export default function Featured() {
  return (
    <aside>
      <div className={styles.featured}>
        <div className={styles.first}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro cum a sapiente ullam quisquam voluptatum facere nemo ipsam qui. Ipsam cumque provident est ducimus numquam illo voluptatibus tenetur laboriosam aspernatur.</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, omnis.</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, omnis.</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, omnis.</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, omnis.</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, omnis.</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, omnis.</div>
      </div>
    </aside>
  );
}
