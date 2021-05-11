import React from "react";
import styles from "./Pages.module.scss";

function UnderConstruction() {
  return (
    <div className={styles.construction}>
      <h4>This part of the site is still under construction.</h4>
      <p>Stay tuned for updates!</p>
    </div>
  );
}

export default UnderConstruction;
