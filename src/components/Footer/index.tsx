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
      <div className={styles.footer_grid}>
        <div>
          <Logo />
          <div className={styles.flex_row}>
            <HeadsetMicIcon color="primary" fontSize="large" style={{ marginRight: "0.5em" }} />
            <div>
              <p>Got questions? Call us.</p>
              <p>(800) 8001-8588</p>
            </div>
          </div>
          <div className={styles.mb_sm}>
            <h4>Location</h4>
            <p>15 Real St, Borongan City, PH</p>
          </div>
          <div>
            <FaFacebook />
            <FaTwitter />
            <FaYoutube />
            <FaGooglePlusG />
            <FaLinkedin />
          </div>
        </div>

        {routes.map((nav, index) => (
          <div key={index} className={styles.links}>
            <h4>{nav.header}</h4>
            {nav.links.map((link, index) => (
              <a href="/test" key={index}>
                <p>{link}</p>
              </a>
            ))}
          </div>
        ))}
      </div>
    </IconContext.Provider>
  );
}

export default Footer;
