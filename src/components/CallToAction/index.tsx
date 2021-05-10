import React from "react";
import styles from "./CallToAction.module.scss";
import EmailIcon from "@material-ui/icons/Email";
import cx from "classnames";

function CallToAction() {
  return (
    <div className={styles.cta_background}>
      <div className={styles.cta_container}>
        <div className={styles.header}>
          <EmailIcon />
          <h4>Sign Up to our Newsletter</h4>
        </div>
        <p>...and receive notifications for future discounts!</p>
        <form className={styles.cta_form}>
          <input type="email" name="email" id="cta-email" placeholder="Email address" />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default CallToAction;
