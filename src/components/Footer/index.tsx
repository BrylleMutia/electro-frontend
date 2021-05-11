import React from "react";
import styles from "./Footer.module.scss";
import { IconContext } from "react-icons";
import routes from "./routes";

import Logo from "../Navbar/Logo";

import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import { FaFacebook, FaTwitter, FaYoutube, FaGooglePlusG, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <IconContext.Provider value={{ color: "grey", size: "2em", style: { marginRight: "1em" } }}>
      <div className={styles.footer_container}>
        <div className={styles.info}>
          <Logo />
          <div className={styles.flex_row}>
            <HeadsetMicIcon color="primary" fontSize="large" style={{ marginRight: "0.5em" }} />
            <div>
              <p>Got questions? Call us.</p>
              <p>(800) 8001-8588 / (0600) 764-755</p>
            </div>
          </div>
          <div className={styles.mb_sm}>
            <h4>Location</h4>
            <p>15 Real St, Borongan City, PH</p>
          </div>
          <div>
            <a href="/test">
              <FaFacebook />
            </a>
            <a href="/test">
              <FaTwitter />
            </a>
            <a href="/test">
              <FaYoutube />
            </a>
            <a href="/test">
              <FaGooglePlusG />
            </a>
            <a href="/test">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className={styles.nav_container}>
          {routes.map((nav, index) => (
            <div key={index} className={index === 0 ? styles.products_nav_grid : styles.customer_care}>
              <h4 style={{ marginBottom: "1em" }}>{nav.header}</h4>
              <div className={styles.products_nav}>
                {nav.links.map((link, index) => (
                  <a href="/test" key={index}>
                    <p>{link}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default Footer;
