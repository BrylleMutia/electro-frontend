import React, { useState } from "react";
import styles from "./Showcase.module.scss";

import { Carousel } from 'antd';

import Img1 from "./assets/1.png";
import Img2 from "./assets/2.png";
import Img3 from "./assets/3.png";

function Showcase() {
  const items = [
    {
      product: "Samsung Galaxy Note 20",
      image: Img1
    },
    {
      product: "MacBook Air",
      image: Img2
    },
    {
      product: "Google Pixel 5",
      image: Img3
    },
  ];

  return (
    <Carousel className={styles.carousel} autoplay>
      {items.map((item) => (
        <div className={styles.carousel_item}>
          <img src={item.image} alt={item.product} />
        </div>
      ))}
    </Carousel>
  );
};

export default Showcase;
