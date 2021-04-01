import React, { useState } from "react";
import styles from "./Showcase.module.scss";

import { Carousel } from 'antd';
import { Button } from "@material-ui/core";

import Img1 from "./assets/1.png";
import Img2 from "./assets/2.png";
import Img3 from "./assets/3.png";

const Showcase = () => {
  const [items] = useState([
    {
      product: "Samsung Galaxy Note 20",
      title: "The New Standard",
      price: '39, 999.00',
      image: Img1
    },
    {
      name: "MacBook Air",
      description: "Lightweight Tech",
      price: "54, 990.00",
      image: Img2
    },
    {
      name: "Google Pixel 5",
      description: "The Ultimate Phone",
      price: "36, 854.99",
      image: Img3
    },
  ]);

  return (
    <Carousel className={styles.carousel}>
      {items.map((item) => (
        <div className={styles.carousel_item}>
          <div>
            <h4>{item.title}</h4>
            <h3>{item.description}</h3>
            <p>
              P {item.price}
            </p>
            <Button color="primary" variant="contained">
              Buy Now
            </Button>
          </div>

          <img src={item.image} alt={item.title} />
        </div>
      ))}
    </Carousel>
  );
};

export default Showcase;
