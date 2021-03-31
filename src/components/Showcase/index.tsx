import React from 'react'
import styles from "./Showcase.module.scss";
import Img1 from "./assets/1.png";
import Img2 from "./assets/2.png";
import Img3 from "./assets/3.png";

function Showcase(): JSX.Element {
    return (
        <div className={styles.showcase}>
            <img src={Img1} alt="showcase-1"/>
        </div>
    )
}

export default Showcase;
